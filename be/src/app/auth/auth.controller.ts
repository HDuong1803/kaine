import {
  InputLoginWithLine,
  type OutputLogout,
  type OutputLoginUser,
  InputRefreshToken,
  type OutputRefreshToken
} from '@app'
import { logError, onError, onSuccess, type Option } from '@constants'
// import { AuthMiddleware } from '@middlewares'
import { Singleton } from '@providers'
import { Request as ExpressRequest } from 'express'
import {
  Body,
  Controller,
  // Middlewares,
  Post,
  Request,
  Route,
  // Security,
  Tags,
  Example
} from 'tsoa'

@Tags('Auth')
@Route('api')
export class AuthController extends Controller {
  @Post('login/line')
  @Example<any>(
    {
      data: {
        detail: {
          _id: '671caa61759e47a416830f7c',
          username: 'admin',
          lineId: 'U11319a96b843699427db405fd0b27089',
          role: 1,
          refresh_token: '',
          createdAt: '2024-10-26T08:37:53.881Z',
          updatedAt: '2024-10-26T10:20:50.810Z',
          __v: 0,
          last_login_at: '2024-10-26T10:20:50.809Z'
        }
      },
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async loginLine(
    @Body() payload: InputLoginWithLine,
    @Request() req: ExpressRequest
  ): Promise<Option<OutputLoginUser>> {
    try {
      const res = await Singleton.getAuthInstance().loginWithLine(
        payload.lineToken
      )
      return onSuccess(res)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Post('logout')
  @Example<any>(
    {
      data: true,
      message: 'Success',
      count: 1,
      success: true
    },
    'Success'
  )
  public async logout(
    @Request() req: ExpressRequest
  ): Promise<Option<OutputLogout>> {
    try {
      const authorization = req.headers.authorization as string
      const res = await Singleton.getAuthInstance().logout(authorization)
      return onSuccess(res)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Post('admin/token')
  @Example<any>(
    {
      data: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluaXN0cmF0b3JAZ21haWwuY29tIiwicm9sZSI6MSwiaWF0IjoxNzEwMTI1NTE1LCJleHAiOjE3MTAyMTE5MTV9.9E2zPNo8La-wS5eQThyLHrmZuFzD732SYFUbW9cetNE'
      },
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async refreshTokenAdmin(
    @Request() req: ExpressRequest,
    @Body() body: InputRefreshToken
  ): Promise<Option<OutputRefreshToken>> {
    try {
      const res = await Singleton.getAuthInstance().refreshToken(body)
      return onSuccess(res)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }
}
