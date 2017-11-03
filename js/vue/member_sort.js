var memberSort  = new Vue({
  el: "#members-sort-area",
  data: {
    // flags
    memberSortAreaShowable: true,
    notSortedMembers: false,
    removeModalShowable: false,
    addedDescMessage: false,

    // data
    lastMemberId: 0,
    macroMessage: null,
    members: [
    ],

    aetherytes: {
      "gyr-abania-fringes": [
        { x: 30.7, y: 10.5, addtional: 8.0 },
        { x: 8.8, y: 11.2, additional: 2.0 },
        { x: 29.7, y: 26.4, additional: 2.0 }
      ],
      "gyr-abania-peaks": [
        { x: 8.5, y: 5.7, additonal: 6.0 },
        { x: 23.7, y: 6.5, additional: 2.0 },
        { x: 16.0, y: 36.4, additional: 2.0 },
        { x: 32.8, y: 29.8, additional: 4.0 }
      ],
      "gyr-abania-lochs": [
        { x: 8.4, y: 21.1, additional: 2.0 },
        { x: 33.7, y: 34.6, additional: 2.0 }
      ],
      "othard-ruby-sea": [
        { x: 38.8, y: 38.9, additional: 8.0 },
        { x: 23.2, y: 9.8, additional: 2.0 },
        { x: 28.6, y: 16.2, additional: 2.0 },
        { x: 6.8, y: 4.3, additional: 8.0 }
      ],
      "othard-yanxia": [
        { x: 28.6, y: 16.2, additional: 18.0 },
        { x: 26.3, y: 13.4, additional: 2.0 },
        { x: 30.1, y: 19.6, additional: 2.0 }
      ],
      "othard-azim-steppe": [
        { x: 23.0, y: 22.2, additional: 2.0 },
        { x: 18.0, y: 38.1, additional: 16.0 },
        { x: 32.6, y: 28.2, additional: 2.0 }
      ]
    }
  },
  methods: {
    sortMembers: function() {
      var members = this.members;
      var beforeMember;
      var newMembers = [];

      while (members.length > 0) {
        var fromPoints = [];
        var toMembers = [];
        var areaKey = null;
        var results = [];
        var result = null;

        if (beforeMember) {
          if (this.isExistsMemberByAreaKey(members, beforeMember.area.key)) {
            areaKey = beforeMember.area.key;
            fromPoints = this.aetherytes[areaKey];
            fromPoints.push(beforeMember.point);
          }
          else {
            areaKey = this.getNearAreaKey(members, beforeMember.area.key);
            fromPoints = this.aetherytes[areaKey];
          }
        }
        else {
          areaKey = this.getAreaKeyWithMostMember(members);
          fromPoints = this.aetherytes[areaKey];
        }
        toMembers = this.getMembersByAreaKey(members, areaKey);

        results = this.checkBetweenPoints(fromPoints, toMembers);
        result = this.getShortestResult(results);

        beforeMember = this.sliceMemberById(members, result.memberId);
        newMembers.push(beforeMember);
      }
      this.members = newMembers;
      this.notSortedMembers = false;
    },
    addMember: function(name, area, point) {
      var id = this.increaseLastMemberId();
      var member = { id: id, name: name, area: area, point: point };
      this.members.push(member);
      this.changeShowSortArea();
    },
    changeShowSortArea: function() {
      memberSort.memberSortAreaShowable = this.members.length > 0;
    },
    increaseLastMemberId: function() {
      if (!(this.lastMemberId > 0))
        this.lastMemberId = this.getLastMemberId();
      return this.lastMemberId += 1;
    },
    sliceMemberById: function(members, memberId) {
      for (var i = 0; i < members.length; i++) {
        var member = members[i];
        if (member.id == memberId)
          return members.splice(i, 1)[0];
      }
      return undefined;
    },
    getLastMemberId: function() {
      var memberId = 0;
      if (this.members.length > 0)
        memberId = Math.max.apply(null, this.members.map(function(member) { return member.id; }));

      if (memberId < 0) memberId = 0;
      return memberId;
    },
    removeMember: function(memberId) {
      this.sliceMemberById(this.members, memberId);
    },
    isExistsMemberByAreaKey: function(members, areaKey) {
      return !!members.find(function(member) { return member.area.key == areaKey; });
    },
    getAreaKeyWithMostMember: function(members) {
      var areas = {};
      members.forEach(function(member) {
        if (!(member.area.key in areas))
          areas[member.area.key] = 0;
        areas[member.area.key] += 1;
      });

      var sortAry = [];
      for (key in areas) sortAry.push([key, areas[key]]);
      sortAry.sort(function(a, b) { return b[1] - a[1]; });
      return sortAry[0][0];
    },
    getMembersByAreaKey: function(members, areaKey) {
      var mems = [];
      members.forEach(function(member) {
        if (member.area.key == areaKey)
          mems.push(member);
      });
      return mems;
    },
    getNearAreaKey: function(members, areaKey) {
      var area = memberAdd.areas.find(function(area) { return area.key == areaKey; });

      members.sort(function(a, b) {
        var abs_a = Math.abs(a.area.order - area.order);
        var abs_b = Math.abs(b.area.order - area.order);
        if (abs_a == abs_b)
          return a.area.order - b.area.order;
        else
          return abs_a - abs_b;
      });
      return members[0].area.key;
    },
    checkBetweenPoints: function(fromPoints, members) {
      var results = [];
      members.sort(function(a, b) { return a.id - b.id; });
      fromPoints.forEach(function(fromPoint) {
        var result = { memberId: null, distance: null, fromPoint: fromPoint, toPoint: null };
        members.forEach(function(member) {
          result.memberId = member.id;
          result.toPoint = member.point;
          result.distance = this.calcDistance(fromPoint, result.toPoint);
        }, this);
        results.push(result);
      }, this);
      return results;
    },
    getShortestResult: function(results) {
      var distances = results.map(function(result) { return result.distance; });
      var shortestDistance = Math.min.apply(null, distances);
      return results.find(function(result) { return result.distance == shortestDistance; });
    },
    calcDistance: function(from, to) {
      var additional = (from.additional) ? from.additional : 0.0;
      return Math.sqrt((from.x - to.x) ** 2 + (from.y - to.y) ** 2) + additional;
    },
    changeMacroMessage: function() {
      this.generateMacroMessage(this.addedDescMessage);
    },
    generateMacroMessage: function(withDescription) {
      var macroMessages = [];
      this.members.forEach(function(member, index) {
        var order = index + 1;
        var m = "/p " + order + ": " + member.name + " " + member.area.name + " (X:" + member.point.x + ", Y: " + member.point.y +")";
        if (withDescription)
          m += " " + member.point.description;
        macroMessages.push(m);
      });

      this.macroMessage = macroMessages.join("\n");
    }
  }
});

//Vue.component('modal', { template: "#modal-remove-member" });

