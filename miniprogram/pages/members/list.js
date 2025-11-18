Page({
  data: {
    members: []
  },
  onLoad() {
    // TODO: 调用 API 拉取会员列表
    // this.fetchMembers();
  },
  onSearch(e) {
    const q = e.detail.value;
    // TODO: 实现搜索
  },
  onAddMember() {
    // 跳转到新增会员页（可扩展）
    wx.navigateTo({ url: '/pages/members/detail' });
  }
});

