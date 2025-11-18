Page({
  data: {
    courses: []
  },
  onLoad() {
    // TODO: 拉取课程目录
  },
  viewSchedule(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `/pages/courses/schedule?courseId=${id}` });
  }
});

