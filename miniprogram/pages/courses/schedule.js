const api = require('../../utils/api.js');

Page({
  data: {
    courseTitle: '',
    schedules: []
    // ...existing code...
  },
  onLoad(options) {
    const { courseId='', coachId='' } = options;
    api.listSchedules({ courseId, coachId }).then(list=>{
      this.setData({
        courseTitle: courseId ? '课程排期' : (coachId ? '教练排期' : '排期'),
        schedules: list
      });
    });
    // ...existing code...
  },
  onBook(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) {
      wx.showToast({ title:'排期ID缺失', icon:'none' });
      return;
    }
    // 调试日志（可在开发者工具 Console 查看）
    console.log('navigate booking scheduleId:', id);
    wx.navigateTo({ url: `/pages/booking/detail?scheduleId=${id}` });
  },
  onJoinWaitlist(e) {
    const id = e.currentTarget.dataset.id;
    const memberId = 1; // 当前会员ID占位
    api.joinWaitlist({ scheduleId:id, memberId }).then(()=>{
      wx.showToast({ title:'已加入候补', icon:'success' });
      this.setData({
        schedules: this.data.schedules.map(s=> s.id===id ? { ...s, remaining: s.remaining } : s)
      });
    });
    // ...existing code...
  }
});
