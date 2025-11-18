const api = require('../../utils/api.js');

Page({
  data: {
    coaches: [],
    filteredCoaches: [],
    keyword: '',
    levelOptions: ['全部', '初级', '中级', '高级'],
    levelIndex: 0,
    empty: false
  },
  onLoad() {
    api.listCoaches().then(list => {
      this.setData({ coaches: list }, () => this.applyFilter());
    });
  },
  onSearch(e) {
    this.setData({ keyword: e.detail.value }, () => this.applyFilter());
  },
  onLevelChange(e) {
    this.setData({ levelIndex: Number(e.detail.value) }, () => this.applyFilter());
  },
  applyFilter() {
    const { coaches, keyword, levelOptions, levelIndex } = this.data;
    const lvl = levelOptions[levelIndex];
    const kw = (keyword || '').toLowerCase();
    const filtered = coaches.filter(c => {
      const matchKw = !kw || (c.name + c.speciality).toLowerCase().includes(kw);
      const matchLvl = lvl === '全部' || c.level === lvl;
      return matchKw && matchLvl;
    });
    this.setData({ filteredCoaches: filtered, empty: filtered.length===0 });
  },
  onSchedule(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/courses/schedule?coachId=${id}` });
  }
});
