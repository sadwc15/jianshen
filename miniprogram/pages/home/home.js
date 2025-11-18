Page({
  data: {
    announcements: []
  },
  onShow() {
    this.loadAnnouncements();
  },
  loadAnnouncements() {
    // TODO: 替换为真实公告接口
    const mock = [
      { id: 101, title: '本周团课新增两节', time: '2025-11-18' },
      { id: 102, title: '双十一会员折扣活动', time: '2025-11-10' }
    ];
    this.setData({ announcements: mock });
  }
});