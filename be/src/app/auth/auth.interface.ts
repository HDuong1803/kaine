import { type IUser } from '@app'

export interface InputLoginWithLine {
  lineToken: string
}

export interface InputRefreshToken {
  refresh_token: string
}

export interface OutputLoginUser {
  detail: IUser
  access_token: string
  refresh_token: string
}

export interface OutputLogout {
  logout: boolean
}

export interface OutputRefreshToken {
  access_token: string
}
