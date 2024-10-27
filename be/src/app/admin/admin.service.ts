import { Constant } from '@constants'
import { db } from '@providers'
class AdminService {
  public async infoAdmin(): Promise<any> {
    const res = await db.user.findOne({
      role: Constant.USER_ROLE.ADMIN
    })
    if (res) return res
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.ADMIN_NOT_FOUND)
  }
}

export { AdminService }
