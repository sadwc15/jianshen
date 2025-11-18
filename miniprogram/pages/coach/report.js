const api = require('../../utils/api.js');

Page({
  data: {
    coachId: null,
    members: [{ id:1, name:'张三' }, { id:2, name:'李四' }],
    memberIndex: 0,
    rating: 8,
    content: ''
  },
  onLoad(options) { this.setData({ coachId: Number(options.coachId||0) }); },
  onMemberChange(e) { this.setData({ memberIndex:Number(e.detail.value) }); },
  onRatingChange(e) { this.setData({ rating:Number(e.detail.value) }); },
  onInput(e) { this.setData({ content:e.detail.value }); },
  onSubmit() {
    const { coachId, members, memberIndex, content, rating } = this.data;
    if (!content) { wx.showToast({ title:'请填写内容', icon:'none' }); return; }
    api.submitTrainingReport({ coachId, memberId: members[memberIndex].id, content, rating }).then(()=>{
      wx.showToast({ title:'已提交', icon:'success' });
      setTimeout(()=>wx.navigateBack(), 500);
    });
  }
});

