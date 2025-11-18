const api = require('../../utils/api.js');

Page({
  data: {
    metrics: {
      ordersCount: 0,
      courseConsumption: 0,
      attendanceRate: 0,
      waitlistConversion: 0
    },
    startDate: '',
    endDate: '',
    granularityOptions: ['日','周','月'],
    granularityIndex: 0,
    coachList: [],
    coachNames: ['全部'],
    coachIndex: 0
  },
  onLoad() {
    const today = new Date();
    const toStr = d=>d.toISOString().slice(0,10);
    const seven = new Date(today.getTime()-6*24*3600*1000);
    this.setData({ startDate:toStr(seven), endDate:toStr(today) });
    api.listCoaches().then(list=>{
      this.setData({ coachList:list, coachNames:['全部'].concat(list.map(c=>c.name)) }, ()=>this.fetch());
    });
  },
  fetch() {
    const { startDate, endDate, granularityIndex, coachIndex, coachList } = this.data;
    const gran = ['day','week','month'][granularityIndex];
    const coachId = coachIndex===0? undefined : coachList[coachIndex-1].id;
    api.fetchMetrics({ startDate, endDate, granularity:gran, coachId }).then(metrics=>{
      this.setData({ metrics });
    });
  },
  onStartDateChange(e){ this.setData({ startDate:e.detail.value }); },
  onEndDateChange(e){ this.setData({ endDate:e.detail.value }); },
  onGranularityChange(e){ this.setData({ granularityIndex:Number(e.detail.value) }); },
  onCoachChange(e){ this.setData({ coachIndex:Number(e.detail.value) }); },
  applyFilter(){ this.fetch(); }
});
