import { Constant } from '@constants'
import mongoose, { Schema } from 'mongoose'

export interface userAttributes {
  username?: string
  lineId: string
  walletAddress?: string
  avatar_url?: string
  role?: number
  refresh_token?: string
  score?: number
  last_login_at: Date
}

const userSchema = new Schema<userAttributes>(
  {
    username: {
      type: String
    },
    lineId: {
      type: String,
      required: true,
      unique: true
    },
    walletAddress: {
      type: String
    },
    avatar_url: {
      type: String
    },
    role: {
      type: Number,
      default: Constant.USER_ROLE.USER
    },
    refresh_token: {
      type: String
    },
    score: {
      type: Number,
      default: 0
    },
    last_login_at: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

export const user = mongoose.model('users', userSchema, undefined, {
  overwriteModels: true
})
