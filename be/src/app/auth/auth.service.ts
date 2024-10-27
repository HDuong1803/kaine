import axios from 'axios'
import { Constant } from '@constants'
import { hashText, signJWT, db, renewJWT } from '@providers'
import { type InputRefreshToken, type OutputRefreshToken, type OutputLogout } from '@app'

class AuthService {
  public async loginWithLine(lineToken: string): Promise<any> {
    try {
      const response = await axios.get('https://api.line.me/v2/profile', {
        headers: {
          Authorization: `Bearer ${lineToken}`
        }
      })

      const { userId, displayName, pictureUrl } = response.data

      let user = await db.user.findOne({ lineId: userId })
      if (!user) {
        user = await db.user.create({
          username: displayName,
          lineId: userId,
          role: Constant.USER_ROLE.USER,
          avatar_url: pictureUrl || '',
          refresh_token: '',
          walletAddress: ''
        })
      }

      user.last_login_at = new Date()
      await user.save()

      const jwtPayload = signJWT({
        lineId: userId
      })

      user.refresh_token = jwtPayload.refresh_token
      await user.save()

      await db.token.findOneAndUpdate(
        { user_id: user.id },
        { token: hashText(jwtPayload.access_token) },
        { upsert: true }
      )

      return {
        detail: user.toJSON()
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async logout(access_token: string): Promise<OutputLogout> {
    await db.token.deleteOne({ token: hashText(access_token) })
    return { logout: true }
  }

  async refreshToken(body: InputRefreshToken): Promise<OutputRefreshToken> {
    try {
      const { access_token, payload } = renewJWT(body.refresh_token)
      const userRes = await db.user.findOne({
        lineId: payload.lineId
      })
      if (!userRes) {
        throw new Error(Constant.NETWORK_STATUS_MESSAGE.UNAUTHORIZED)
      }
      await db.token.findOneAndUpdate(
        { user_id: userRes.id },
        { token: hashText(access_token) },
        { upsert: true, new: true }
      )
      return {
        access_token
      }
    } catch (error) {
      throw new Error(Constant.NETWORK_STATUS_MESSAGE.UNAUTHORIZED)
    }
  }

  // TODO: generate qr code invite friend
}

export { AuthService }
