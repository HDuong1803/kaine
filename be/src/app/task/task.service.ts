import { Constant } from '@constants'
import { db } from '@providers'
class TaskService {
  public async getTask(task_id: string): Promise<any> {
    const task = await db.task.findOne({ _id: task_id })
    if (task) {
      return task
    }
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
  }

  // TODO: Claim Daily
  // TODO: Share Twitter
  // TODO: Join Telegram
  // TODO: Invite Friend
}

export { TaskService }
