export interface IUser {
  id?: string
  username?: string | null
  avatar_url?: string | null
  role?: number | null
  refresh_token?: string | null
  lineId?: string | null
  walletAddress?: string | null
  last_login_at?: Date | null
  created_at?: Date | null
  updated_at?: Date | null
}

export interface OutputListUser {
  data: IUser[]
  total?: number
}

export interface OutputLogin {
  detail: IUser | null
  access_token: string | null
  refresh_token: string | null
}
