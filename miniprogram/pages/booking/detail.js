Page({
  data: {
    detailInfo: '请确认预约信息并支付',
    scheduleId: null,
    schedule: {},
    course: { title: '燃脂有氧' },
    members: [{ id: 1, name: '张三' }, { id: 2, name: '李四' }],
    memberIndex: 0,
    member: { id: 1, name: '张三' },
    approvalNeeded: false,
    altSchedules: [],
    altIndex: 0,
    bookingId: null,
    loading: true,
    loadingAction: false
  },
  onLoad(options) {
    console.log('booking/detail onLoad options:', options);
    const scheduleIdParam = Number(options && options.scheduleId ? options.scheduleId : 0);

    const demoSchedules = [
      { id: 1, date: '2025-11-18', time: '09:00-10:00' },
      { id: 2, date: '2025-11-19', time: '18:00-19:00' },
      { id: 3, date: '2025-11-20', time: '19:00-20:00' }
    ];
    const current = demoSchedules.find(s => s.id === scheduleIdParam) || demoSchedules[0];
    const alts = demoSchedules.map(s => ({ id: s.id, date: s.date, time: s.time, label: `${s.date} ${s.time}` }));

    const hasId = !!scheduleIdParam;
    this.setData({
      scheduleId: hasId ? scheduleIdParam : current.id,
      schedule: current,
      member: this.data.members[0],
      altSchedules: alts,
      altIndex: 0,
      loading: false
    }, () => {
      if (!hasId) wx.showToast({ title: '未收到排期ID，使用示例数据', icon: 'none' });
    });
  },
  onReady() {
    wx.setNavigationBarTitle({ title: '预约详情' });
    console.log('booking/detail onReady: 页面已渲染');
  },
  onShow() {
    console.log('booking/detail onShow');
  },
  onMemberChange(e) {
    const idx = Number(e.detail.value);
    this.setData({ memberIndex: idx, member: this.data.members[idx] });
  },
  onToggleApproval(e) {
    this.setData({ approvalNeeded: !!e.detail.value });
  },
  onAltScheduleChange(e) {
    this.setData({ altIndex: Number(e.detail.value) });
  },
  onConfirmBooking() {
    if (this.data.loading || this.data.loadingAction) return;
    const { schedule, member, approvalNeeded } = this.data;
    if (!schedule.id) { wx.showToast({ title: '排期未加载', icon: 'none' }); return; }
    if (!member.id) { wx.showToast({ title: '请选择会员', icon: 'none' }); return; }
    this.setData({ loadingAction: true });
    setTimeout(() => {
      const orderId = Date.now();
      this.setData({ bookingId: orderId, loadingAction: false });
      if (approvalNeeded) {
        wx.showToast({ title: '已提交审批', icon: 'success' });
      } else {
        wx.showToast({ title: '支付成功（模拟）', icon: 'success' });
      }
    }, 300);
  },
  onReschedule() {
    if (!this.data.bookingId) { wx.showToast({ title: '请先下单', icon: 'none' }); return; }
    const alt = this.data.altSchedules[this.data.altIndex];
    if (!alt) { wx.showToast({ title: '请选择改期班次', icon: 'none' }); return; }
    this.setData({ schedule: { id: alt.id, date: alt.date, time: alt.time } });
    wx.showToast({ title: '改期成功', icon: 'success' });
  },
  onCancelBooking() {
    if (!this.data.bookingId) { wx.showToast({ title: '暂无预约', icon: 'none' }); return; }
    this.setData({ bookingId: null });
    wx.showToast({ title: '已取消', icon: 'success' });
  }
});
