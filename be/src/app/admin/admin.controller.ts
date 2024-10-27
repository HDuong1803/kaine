import type { Option } from '@constants'
import { logError, onError, onSuccess } from '@constants'
import { AdminMiddleware, AuthMiddleware } from '@middlewares'
import { Singleton } from '@providers'
import { Request as ExpressRequest } from 'express'
import {
  Controller,
  Get,
  Middlewares,
  Request,
  Route,
  Security,
  Tags,
  Example
} from 'tsoa'

@Tags('Admin')
@Route('api')
@Security({
  authorization: []
})
@Middlewares([AuthMiddleware, AdminMiddleware])
export class AdminController extends Controller {
  @Get('info')
  @Example<any>(
    {
      data: {
        _id: '65dc4e4cc7d2ffcebd571312',
        username: 'admin',
        lineId: '027db405fd0b27089',
        role: 1,
        refresh_token: '',
        update_at: new Date(),
        create_at: new Date()
      },
      message: 'Success',
      count: 1,
      success: true
    },
    'Success'
  )
  public async infoAdmin(@Request() req: ExpressRequest): Promise<Option<any>> {
    try {
      const res = await Singleton.getAdminInstance().infoAdmin()
      return onSuccess(res)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }
}
