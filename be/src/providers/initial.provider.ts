import { Constant, logger } from '@constants'
import { db } from '@providers'
import web3 from 'web3'

const hashText = (text: string) => web3.utils.sha3(text) as string
/**
 * Initializes the admin user with the given initial username and password if it does not already exist.
 */
const initialAdmin = async () => {
  /**
   * Destructures the ADMIN_INITIAL_PASSWORD and ADMIN_INITIAL_EMAIL from the Constant object.
   * These values are environment variables that are used to set the initial username and password for the admin user.
   */
  const { ADMIN_USERNAME } = Constant
  /**
   * Finds a user in the database with the given username.
   */
  const res = await db.user.findOne({
    lineId: Constant.ADMIN_INITIAL_LINE_ID
  })
  /**
   * Checks if an initial admin user exists in the database. If not, creates one using the
   * ADMIN_INITIAL_EMAIL and hash of ADMIN_INITIAL_PASSWORD environment variables.
   */
  if (!res) {
    await db.user.create({
      username: ADMIN_USERNAME,
      lineId: Constant.ADMIN_INITIAL_LINE_ID,
      avatar_url: '',
      role: Constant.USER_ROLE.ADMIN,
      refresh_token: ''
    })
  } else {
    logger.info(`initialAdmin already exist: ${Constant.ADMIN_INITIAL_LINE_ID}`)
  }
}

export { hashText, initialAdmin }
