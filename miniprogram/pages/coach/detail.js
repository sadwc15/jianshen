const api = require('../../utils/api.js');

Page({
  data: {
    coach: {},
    packages: []
  },
  onLoad(options) {
    const id = options.id;
    Promise.all([api.getCoachDetail(id), api.listPackages(id)]).then(([coach, pkgs]) => {
      this.setData({ coach: { intro:'', ...coach }, packages: pkgs });
    });
  },
  onBuyPackage(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/orders/list?buyPackageId=${id}` });
  },
  onBookPrivate() {
    wx.navigateTo({ url: `/pages/courses/schedule?coachId=${this.data.coach.id}` });
  },
  onViewSchedule() {
    wx.navigateTo({ url: `/pages/courses/schedule?coachId=${this.data.coach.id}` });
  },
  onCreateReport() {
    wx.navigateTo({ url: `/pages/coach/report?coachId=${this.data.coach.id}` });
  }
});
