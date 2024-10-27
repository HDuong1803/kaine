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
  Example,
  Post,
  BodyProp
} from 'tsoa'

@Tags('User')
@Route('api')
// @Security({
//   authorization: []
// })
// @Middlewares([AuthMiddleware])
export class UserController extends Controller {
  @Get('profile')
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
  public async getUser(@Request() req: ExpressRequest): Promise<Option<IUser>> {
    try {
      const user_id = req.headers.id as string
      const result = await Singleton.getUserInstance().getUser(user_id)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Post('add-score')
  public async addScore(
    @Request() req: ExpressRequest,
    @BodyProp('score') score: number
  ): Promise<Option<IUser>> {
    try {
      const userId = req.headers.id as string
      const result = await Singleton.getUserInstance().addScore(userId, score)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Get('top-scores')
  public async getTopScores(
    @Request() req: ExpressRequest
  ): Promise<Option<IUser>> {
    try {
      const result = await Singleton.getUserInstance().getTopScores()
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }
}
