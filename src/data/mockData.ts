import { Task } from '../types';

export const mockTasks: Task[] = [
  {
    task_id: 'T20260308001',
    customer_id: '13812345678',
    call_timestamp: '2026-03-08 22:15:00',
    audio_record_url: 'oss://bucket/audio/001.mp3',
    full_transcript: '你好，我想问一下你们那个企业版套餐具体包含哪些功能？如果我现在买的话有没有什么折扣？',
    summary: '咨询企业版套餐功能及当前优惠折扣',
    intent_type: '售前咨询',
    ai_suggestion: '发送企业版产品介绍及最新报价单，并安排销售代表跟进。',
    priority: 3,
    status: '待处理'
  },
  {
    task_id: 'T20260308002',
    customer_id: '13998765432',
    call_timestamp: '2026-03-08 22:18:30',
    audio_record_url: 'oss://bucket/audio/002.mp3',
    full_transcript: '你们系统怎么回事啊？我刚才付了款一直没收到确认邮件，账号也登不进去，赶紧给我解决！',
    summary: '付款后未收到确认邮件且无法登录账号，客户情绪激动',
    intent_type: '投诉建议',
    ai_suggestion: '立即核实支付网关状态及账号开通情况，优先回拨安抚客户并提供临时登录方案。',
    priority: 1,
    status: '待处理'
  },
  {
    task_id: 'T20260308003',
    customer_id: '13755556666',
    call_timestamp: '2026-03-08 22:25:10',
    audio_record_url: 'oss://bucket/audio/003.mp3',
    full_transcript: '喂，我想预约明天下午两点的技术支持，帮我看一下服务器配置的问题。',
    summary: '预约明天下午2点技术支持，排查服务器配置问题',
    intent_type: '预约服务',
    ai_suggestion: '检查技术支持团队明日下午2点排班，发送预约确认短信。',
    priority: 4,
    status: '已回访'
  },
  {
    task_id: 'T20260308004',
    customer_id: '13611112222',
    call_timestamp: '2026-03-08 22:40:05',
    audio_record_url: 'oss://bucket/audio/004.mp3',
    full_transcript: '我之前买的那个设备，现在开机亮红灯，说明书上说要联系售后，你们能派人来看看吗？',
    summary: '设备开机亮红灯，请求售后上门维修',
    intent_type: '售后服务',
    ai_suggestion: '记录设备故障现象，安排当地维修网点工程师联系客户确认上门时间。',
    priority: 2,
    status: '待处理'
  },
  {
    task_id: 'T20260308005',
    customer_id: '15899990000',
    call_timestamp: '2026-03-08 23:05:20',
    audio_record_url: 'oss://bucket/audio/005.mp3',
    full_transcript: '打扰了，我就想问问你们周末上班吗？我有个东西想寄过去给你们看看。',
    summary: '咨询周末工作时间及邮寄地址',
    intent_type: '其他',
    ai_suggestion: '回复周末工作时间及官方收件地址信息。',
    priority: 5,
    status: '归档'
  },
  {
    task_id: 'T20260308006',
    customer_id: '18600001111',
    call_timestamp: '2026-03-08 23:30:00',
    audio_record_url: 'oss://bucket/audio/006.mp3',
    full_transcript: '你好，我的账号密码忘记了，绑定的手机号也换了，现在怎么找回啊？',
    summary: '账号密码遗忘且绑定手机号已更换，寻求找回方法',
    intent_type: '售后服务',
    ai_suggestion: '发送账号申诉链接，引导客户通过身份验证找回账号。',
    priority: 3,
    status: '待处理'
  },
  {
    task_id: 'T20260308007',
    customer_id: '13522223333',
    call_timestamp: '2026-03-09 00:15:45',
    audio_record_url: 'oss://bucket/audio/007.mp3',
    full_transcript: '你们那个新出的功能太难用了，经常闪退，能不能优化一下？',
    summary: '反馈新功能体验差，存在频繁闪退问题',
    intent_type: '投诉建议',
    ai_suggestion: '记录设备型号及系统版本，提交研发团队排查闪退原因，并向客户致歉。',
    priority: 2,
    status: '待处理'
  }
];
