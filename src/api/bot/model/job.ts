/**
 * job.Job，添加任务的入参
 */
export interface Job {
  /**
   * 回答类型, jobType=3使用的参数, 1=文本消息, 2=注入消息
   */
  answerType: number;
  /**
   * 指令别名类型, jobType=1使用的参数, 1=无状态消息, 2=主人消息
   */
  fullMatchType: number;
  /**
   * 群聊id, jobType=2,3使用的参数, jobType=2且私聊, group_id=0
   */
  groupId: number;
  /**
   * 执行内容
   */
  handler: string;
  /**
   * 任务id
   */
  id?: string;
  /**
   * 任务类型,1-指令别名,2-定时任务,3-你问我答
   */
  jobType: number;
  /**
   * 当jobType=1时 为指令别名,当jobType=2时 为cron表达式,当jobType=3时 为正则表达式
   */
  matcher: string;
  /**
   * 问题类型, jobType=3使用的参数, 1=单独问, 2=所有人问
   */
  questionType: number;
  /**
   * 机器人id
   */
  selfId?: number;
  /**
   * 用户id, jobType=2,3使用的参数, 当jobType=3, QuestionType=2,userId=0
   */
  userId: number;
}

/**
 * job.DeleteReq，删除任务的入参
 */
export interface DeleteReq {
  /**
   * 任务id
   */
  idList: string[];
  /**
   * 机器人qq
   */
  selfId: number;
}
