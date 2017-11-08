const sweetScroll = new SweetScroll();

var memberForm = new Vue({
  el: "#member-add-area",
  data: {
    // flags
    areaSelectShowable: false,
    areaImageShowable: false,
    submitAreaShowable: false,

    // model
    memberName: "",
    selectedArea: "",
    selectedPoint: null,

    // data
    areas: [
      { name: "ギラバニア辺境地帯", key: "gyr-abania-fringes", group: "gyr-abania", order: 1  },
      { name: "ギラバニア山岳地帯", key: "gyr-abania-peaks", group: "gyr-abania", order: 2 },
      { name: "ギラバニア湖畔地帯", key: "gyr-abania-lochs", group: "gyr-abania", order: 3 },
      { name: "紅玉海", key: "othard-ruby-sea", group: "othard", order: 4 },
      { name: "ヤンサ", key: "othard-yanxia", group: "othard", order: 5 },
      { name: "アジムステップ", key: "othard-azim-steppe", group: "othard", order: 6 }
    ],
    treasurePoints: {
      "gyr-abania-fringes": [
        { coords: "99, 104, 175, 119", x: 15.5, y: 16.5, description: "カストルム・オリエンス南東、カステッルム・コルヴィ付近" },
        { coords: "54, 70, 124, 85", x: 9.3, y: 12.5, description: "カストルム・オリエンス門前" },
        { coords: "66, 212, 138, 227", x: 11.1, y: 31.1, description: "流星の尾、夜の森側出口付近" },
        { coords: "217, 141, 290, 156", x: 31.5, y: 20.8, description: "マップ東、ピーリングストーンズ北" },
        { coords: "45, 191, 112, 206", x: 8.3, y: 28.2, description: "夜の森、賢者の木南" },
        { coords: "174, 128, 243, 143", x: 25.7, y: 20.1, description: "ピーリングストーンズ北西、ウィルラ・ニリヤ西" },
        { coords: "158, 74, 236, 89", x: 23.4, y: 12.2, description: "マップ北側付近、ラールガーズリーチ南西付近" },
        { coords: "220, 212, 298, 227", x: 33.0, y: 31.4, description: "マップ南東、ヤーンの大穴北東" }
      ],
      "gyr-abania-peaks": [
        { coords: "0, 220, 65, 235", x: 8.6, y: 32.5, description: "マップ南西、アラギリ西" },
        { coords: "102, 51, 170, 66", x: 16.1, y: 9.2, description: "マップ北西、アラガーナ西" },
        { coords: "160, 214, 233, 229", x: 24.0, y: 31.6, description: "マップ南東、カストルム・アバニア西" },
        { coords: "96, 225, 170, 240", x: 15.7, y: 33.1, description: "マップ南、アラギリ北" },
        { coords: "100, 151, 172, 166", x: 15.4, y: 22.9, description: "マップ中央やや西崖上" },
        { coords: "175, 86, 248, 101", x: 26.0, y: 13.7, description: "アラガーナ南東、ラストロック付近" },
        { coords: "75, 23, 141, 38", x: 12.2, y: 5.5, description: "マップ北西、ラールガーズリーチ東" },
        { coords: "227, 55, 296, 70", x: 33.1, y: 9.8, description: "マップ北東、涙隠しの丘付近" }
      ],
      "gyr-abania-lochs": [
        { coords: "50, 115, 111, 130", x: 8.7, y: 17.7, description: "ポルタ・プレトリア北" },
        { coords: "30, 35, 86, 50", x: 5.8, y: 6.7, description: "マップ北西、王の狩り場付近" },
        { coords: "220, 34, 282, 49", x: 31.9, y: 6.4, description: "マップ北東端" },
        { coords: "168, 48, 230, 63", x: 25.1, y: 7.8, description: "マップ北東、ブラッドハウ墓地付近" },
        { coords: "131, 158, 201, 173", x: 19.6, y: 23.3, description: "マップ中央、橋の南" },
        { coords: "106, 197, 172, 212", x: 15.9, y: 28.6, description: "マップ中央やや南、ロッホワッチ塔付近" },
        { coords: "164, 218, 234, 233", x: 24.5, y: 32.0, description: "マップ南、サリ僧院北" },
        { coords: "203, 113, 274, 128", x: 29.7, y: 17.4, description: "マップ東、女王の庭付近" }
      ],
      "othard-ruby-sea": [
        { coords: "43, 200, 106, 215", x: 7.7, y: 29.7, description: "マップ南西、ゼッキ島南" },
        { coords: "25, 97, 87, 112", x: 5.2, y: 15.1, description: "マップ西、イサリ村南" },
        { coords: "225, 118, 295, 133", x: 32.9, y: 18.4, description: "マップ東、碧のタマミズ東" },
        { coords: "190, 205, 259, 220", x: 27.7, y: 30.0, description: "マップ南東、サカズキ島北西" },
        { coords: "212, 170, 282, 185", x: 30.5, y: 25.4, description: "マップ南東、ベッコウ島南" },
        { coords: "113, 55, 175, 70", x: 16.9, y: 9.6, description: "マップ北、オノコロ島西" },
        { coords: "122, 252, 192, 267", x: 18.4, y: 36.3, description: "マップ南、獄之蓋西" },
        { coords: "222, 48, 285, 63", x: 32.7, y: 8.8, description: "マップ北東、オノコロ島東、沖之岩頂上" }
      ],
      "othard-yanxia": [
        { coords: "215, 195, 283, 210", x: 31.0, y: 28.5, description: "マップ南東、東龍鱗橋東" },
        { coords: "85, 203, 153, 218", x: 13.2, y: 30.1, description: "マップ南西、鼻頭" },
        { coords: "220, 245, 290, 260", x: 31.8, y: 35.5, description: "マップ南東、カストルム・フルーミニス付近" },
        { coords: "150, 190, 217, 205", x: 22.2, y: 27.8, description: "マップ南、西龍鱗橋北" },
        { coords: "218, 24, 280, 39", x: 32.0, y: 5.4, description: "マップ北東、アジムステップ傍" },
        { coords: "133, 29, 193, 44", x: 20.0, y: 5.5, description: "マップ北、ドマ城下町北" },
        { coords: "147, 86, 215, 101", x: 21.8, y: 13.9, description: "マップ中央やや北、烈士庵西" },
        { coords: "77, 123, 145, 138", x: 12.0, y: 18.9, description: "マップ西、ドマ城南西" }
      ],
      "othard-azim-steppe": [
        { coords: "24, 165, 86, 180", x: 5.3, y: 24.4, description: "マップ西端、岩場上" },
        { coords: "143, 255, 211, 270", x: 21.7, y: 36.9, description: "マップ南、岩場上" },
        { coords: "214, 149, 280, 164", x: 30.9, y: 22.1, description: "マップ東、再会の市北西" },
        { coords: "205, 245, 272, 260", x: 29.2, y: 35.3, description: "マップ南東、紅玉海西、岩場上" },
        { coords: "202, 70, 270, 85", x: 28.6, y: 10.9, description: "マップ北東、モル・イロー西、岩場上" },
        { coords: "106, 167, 173, 182", x: 16.5, y: 25.0, description: "マップ中央やや南西、明けの玉座南西" },
        { coords: "99, 223, 166, 238", x: 14.9, y: 33.0, description: "マップ南西、ドタール・カー東" },
        { coords: "67, 102, 134, 117", x: 10.6, y: 15.9, description: "マップ西北西、バルダム覇道南" }
      ]
    },
    points: [],
    imageName: ""
  },
  methods: {
    inputMemberName: function() {
      if (this.memberName && this.memberName.length > 0) {
        this.areaSelectShowable = true;
        this.showAreaMap();
      }
      else {
        this.areaSelectShowable = false;
        this.areaImageShowable = false;
        this.submitAreaShowable = false;
      }
    },
    showAreaMap: function() {
      this.selectedPoint = null;
      this.submitAreaShowable = false;

      var ps = this.treasurePoints[this.selectedArea];
      if (ps && ps.length > 0) {
        this.points = ps;
        this.changeImage(this.selectedArea);
      }
      else {
        if (this.imageName != 'noimage')
          this.changeImage('noimage');
      }
    },
    changeImage: function(imageName) {
      this.areaImageShowable = false;
      this.imageName = imageName;
      setInterval(function() { memberForm.areaImageShowable = true; }, 1000);
    },
    addMember: function() {
      var area = this.areas.find(function(a) {
        return a.key == this.selectedArea;
      }, this);

      memberSort.addMember(this.memberName, area, this.selectedPoint);

      this.resetForm();
      this.resetFlag();
      this.resetHash();
    },
    resetForm: function() {
      this.memberName = this.selectedPoint = this.selectedArea = null;
    },
    resetFlag: function() {
      this.areaSelectShowable = this.areaImageShowable = this.submitAreaShowable = false;
    },
    resetHash: function() {
      location.hash = '';
    },
    toggleScrollSubmitArea: function() {
      if (this.submitAreaShowable)
        location.hash = "member-add-submit-area";
      else
        location.hash = "";
    }
  }
});

Vue.component('area-list', {
  props: ['point', 'index', 'area', 'memberName'],
  template: '<area shape="rect" v-bind:coords="point.coords" v-on:click="selectTreasurePoint" href="#member-add-submit-area" data-scroll>',
  methods: {
    selectTreasurePoint: function() {
      memberForm.selectedPoint = this.point;
      if (memberForm.memberName && memberForm.selectedPoint && memberForm.selectedArea)
        memberForm.submitAreaShowable = true;
      else
        memberForm.submitAreaShowable = false;
    }
  }
});

