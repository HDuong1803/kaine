import { Constant, logger } from '@constants'
import { quizzes, stake, task, token, user } from '@schemas'
import mongoose from 'mongoose'

async function connectToMongoDB() {
  await mongoose.connect(`${Constant.MONGODB_URL}`, {})
  logger.info('Connected to database')
}

const db = {
  mongoose,
  user,
  token,
  quizzes,
  stake,
  task
}

export { connectToMongoDB, db }
