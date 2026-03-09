export type IntentType = '售前咨询' | '投诉建议' | '售后服务' | '预约服务' | '其他';
export type TaskStatus = '待处理' | '已回访' | '归档';

export interface Task {
  task_id: string;
  customer_id: string;
  call_timestamp: string;
  audio_record_url: string;
  full_transcript: string;
  summary: string;
  intent_type: IntentType;
  ai_suggestion: string;
  priority: number; // 1 (Urgent) to 5 (Normal)
  status: TaskStatus;
}
