(function() {
  let memberAdd = new Vue({
    el: "#member-add-area",
    data: {
      memberName: "",
      areaLocation: "",
      nameTextShowable: false,
      areaSelectShowable: false,
      areaImageShowable: false,
      imageCoordinate: "",
      treasurePoints: {
        "gyr-abania-fringes": [{ coords: "163, 83, 10", point: "23.4, 12.2" }]
      },
      treasurePoint: ""
    },
    methods: {
      showAddMemberForm: function() {
        this.nameTextShowable = true;
      },
      inputMemberName: function() {
        if (this.memberName.length > 0)
          this.areaSelectShowable = true;
        else
          this.areaSelectShowable = false;
      },
      showAreaMap: function() {
        this.areaImageShowable = true;
        let = points = this.treasurePoints[this.areaLocation];

        if (points.length > 0) {
          var _this = this;
          this.treasurePoint = '';
          points.forEach(function(dat) {
            this.treasurePoint = this.treasurePoint + '<area shape="circle" coords="' + dat.coords + '" v-on:click="selectedTreasurePoint(\'' + dat.point + '\'">';
          }, _this);
        }
      }
    }
  });
})();
