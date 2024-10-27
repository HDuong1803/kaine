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

@Tags('Stake')
@Route('api')
// @Security({
//   authorization: []
// })
// @Middlewares([AuthMiddleware])
export class StakeController extends Controller {
  @Get('stake-detail')
  @Example<any>(
    {
      data: {
        _id: '65defc93ce29856a1d3d3687',
        username: 'Hai Duong',
        lineId: 'U11319a96b8436994027db405fd0b27089',
        role: 0,
        pictureUrl: '',
        refresh_token: '',
        created_at: '2024-02-28T09:27:47.341Z',
        updated_at: '2024-02-28T09:27:47.341Z',
        __v: 0
      },
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async getStake(
    @Request() req: ExpressRequest
  ): Promise<Option<IUser>> {
    try {
      const user_id = req.headers.id as string
      const result = await Singleton.getStakeInstance().getStake(user_id)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }
}
