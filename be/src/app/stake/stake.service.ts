import { Constant } from '@constants'
import { db } from '@providers'
class StakeService {
  public async getStake(stake_id: string): Promise<any> {
    const stake = await db.stake.findOne({ where: { stake_id } })
    if (stake) {
      return stake
    }
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
  }

  // TODO: Blockchain staking service
}

export { StakeService }
