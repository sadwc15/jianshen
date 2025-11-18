Page({
  data: {
    // 按需替换为你实际存在的页面路径
    menus: [
      { id: 'members',   icon: '👥', label: '会员管理', url: '/pages/members/index' },
      { id: 'courses',   icon: '📚', label: '课程管理', url: '/pages/courses/index' },
      { id: 'coaches',   icon: '🧑‍🏫', label: '教练管理', url: '/pages/coaches/index' },
      { id: 'orders',    icon: '🧾', label: '订单管理', url: '/pages/orders/index' },
      { id: 'booking',   icon: '📅', label: '预约管理', url: '/pages/booking/index' },
      { id: 'equipment', icon: '🏋️', label: '器材管理', url: '/pages/equipment/index' },
      { id: 'report',    icon: '📈', label: '数据报表', url: '/pages/report/index' },
      { id: 'settings',  icon: '⚙️', label: '设置',     url: '/pages/settings/index' }
    ]
  },

  onIconTap(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({ url })
    } else {
      wx.showToast({ title: '页面未配置', icon: 'none' })
    }
  },

  onQuickBooking() {
    wx.navigateTo({ url: '/pages/booking/create' })
  },

  onQuickOrder() {
    wx.navigateTo({ url: '/pages/orders/create' })
  }
})
