import { type IUser } from '@app'
import { type Option } from '@constants'
import { logError, onError, onSuccess } from '@constants'
// import { AdminMiddleware, AuthMiddleware } from '@middlewares'
import { Singleton } from '@providers'
import { Request as ExpressRequest } from 'express'
import {
  Controller,
  Get,
  // Middlewares,
  Request,
  Route,
  // Security,
  Tags,
  Example
} from 'tsoa'

@Tags('Task')
@Route('api')
// @Security({
//   authorization: []
// })
// @Middlewares([AuthMiddleware])
export class TaskController extends Controller {
  @Get('task')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async getTask(@Request() req: ExpressRequest): Promise<Option<IUser>> {
    try {
      const user_id = req.headers.id as string
      const result = await Singleton.getTaskInstance().getTask(user_id)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }
}
