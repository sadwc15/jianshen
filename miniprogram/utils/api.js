const delay = (ms=300)=>new Promise(r=>setTimeout(r,ms));

const api = {
  async fetchMetrics({ startDate, endDate, granularity, coachId }) {
    await delay();
    const base = 120;
    const factor = granularity==='week'?1.2:granularity==='month'?1.8:1;
    const coachBias = coachId?0.9:1;
    const ordersCount = Math.round(base*factor*coachBias);
    const courseConsumption = Math.round(4.2*ordersCount);
    const attendanceRate = Math.min(95, Math.round(65*factor));
    const waitlistConversion = Math.min(60, Math.round(30*factor));
    return { ordersCount, courseConsumption, attendanceRate, waitlistConversion };
  },
  async listCoaches() {
    await delay();
    return [
      { id:1, name:'李教练', level:'高级', cert:'国家级证书', phone:'13800000001', speciality:'增肌/康复' },
      { id:2, name:'王教练', level:'中级', cert:'私教证', phone:'13800000002', speciality:'减脂/塑形' },
      { id:3, name:'张教练', level:'初级', cert:'健身教练证', phone:'13800000003', speciality:'体态改善' }
    ];
  },
  async getCoachDetail(id) {
    await delay();
    return { id:Number(id), name:'李教练', cert:'国家级健身教练', experience:'8年', intro:'专注增肌与赛前备赛' };
  },
  async listPackages(coachId) {
    await delay();
    return [
      { id:100+Number(coachId||0), title:'10次私教', sessions:10, validity:180, price:2000 },
      { id:200+Number(coachId||0), title:'5次体验', sessions:5, validity:90, price:900 }
    ];
  },
  async listSchedules({ courseId, coachId }={}) {
    await delay();
    return [
      { id:1, date:'2025-11-18', time:'09:00-10:00', capacity:20, remaining:5, coachId:1 },
      { id:2, date:'2025-11-19', time:'18:00-19:00', capacity:20, remaining:0, coachId:2 },
      { id:3, date:'2025-11-20', time:'19:00-20:00', capacity:15, remaining:8, coachId:1 }
    ].filter(s=>coachId? s.coachId===Number(coachId):true);
  },
  async getSchedule(id) { const all = await this.listSchedules(); return all.find(s=>s.id===Number(id)); },
  async joinWaitlist({ scheduleId, memberId }) { await delay(); return { scheduleId, memberId, status:'waitlisted' }; },
  async createOrder({ scheduleId, memberId, approvalNeeded }) {
    await delay();
    const orderId = Date.now();
    return { orderId, needPay:!approvalNeeded, amount:100 };
  },
  async payOrder({ orderId }) {
    await delay();
    return { timeStamp:String(Date.now()), nonceStr:'mock', package:'prepay_id=mock', signType:'MD5', paySign:'mocksign' };
  },
  async cancelBooking({ bookingId }) { await delay(); return { bookingId, status:'canceled' }; },
  async rescheduleBooking({ bookingId, newScheduleId }) { await delay(); return { bookingId, newScheduleId, status:'rescheduled' }; },
  async submitTrainingReport({ coachId, memberId, content, rating }) {
    await delay();
    return { id:Date.now(), coachId, memberId, rating, content, createdAt:new Date().toISOString() };
  },
  async getMembers() {
    await delay();
    return [
      { id:1, name:'张三' },
      { id:2, name:'李四' },
      { id:3, name:'王五' }
    ];
  }
};

module.exports = api;
