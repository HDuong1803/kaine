import { Constant } from '@constants'
import { db } from '@providers'
class UserService {
  public async getUser(userId: string): Promise<any> {
    const user = await db.user.findOne({ _id: userId })
    if (user) {
      return user
    }
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
  }

  public async addScore(userId: string, score: number): Promise<any> {
    return await db.user.findOneAndUpdate(
      { _id: userId },
      { $inc: { score } },
      { upsert: true, new: true }
    )
  }

  public async getTopScores(limit: number = 10): Promise<any[]> {
    return await db.user.find({}).sort({ score: -1 }).limit(limit)
  }

  public async getUserRank(userId: string): Promise<{ rank: number }> {
    const user = await db.user.findOne({ _id: userId })
    if (!user) throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)

    const higherScoredUsers = await db.user.countDocuments({ score: { $gt: user.score } })
    const rank = higherScoredUsers + 1
    return { rank }
  }

  // TODO: update user
}

export { UserService }
