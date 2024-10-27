import { type InputUpdateTopic, type InputCreateTopic, type InputCreateQuiz, type InputUpdateQuiz, type InputCreateQuestion, type InputUpdateQuestion } from '@app'
import { Constant } from '@constants'
import { db } from '@providers'

class QuizzesService {
  public async createTopic(body: InputCreateTopic): Promise<any> {
    const newTopic = await db.quizzes.create(body)
    return newTopic
  }

  public async getTopicById(topic_id: string): Promise<any> {
    const topic = await db.quizzes.findOne({ _id: topic_id })
    if (topic) return topic
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
  }

  public async getAllTopics(page = 1, limit = 5): Promise<any[]> {
    const skip = (page - 1) * limit
    return await db.quizzes.find({}).skip(skip).limit(limit)
  }

  public async updateTopic(topic_id: string, body: InputUpdateTopic): Promise<any> {
    const { ...data } = body
    const updatedTopic = await db.quizzes.findOneAndUpdate(
      { _id: topic_id },
      data,
      {
        new: true
      }
    )
    if (updatedTopic) return updatedTopic
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
  }

  public async deleteTopic(topic_id: string): Promise<boolean> {
    const result = await db.quizzes.deleteOne({ _id: topic_id })
    return result.deletedCount > 0
  }

  public async addQuizToTopic(topic_id: string, quizData: InputCreateQuiz): Promise<any> {
    const updatedTopic = await db.quizzes.findOneAndUpdate(
      { _id: topic_id },
      { $push: { quizzes: quizData } },
      { new: true }
    )
    if (updatedTopic) return updatedTopic
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
  }

  public async getQuizById(topic_id: string, quiz_id: string): Promise<any> {
    const topic = await db.quizzes.findOne(
      { _id: topic_id, topic_status: Constant.TOPIC_STATUS.ONGOING, 'quizzes.quiz_id': quiz_id },
      { 'quizzes.$': 1 }
    )
    if (topic?.quizzes.length) return topic.quizzes[0]
    throw new Error('Quiz not accessible, topic may not be ongoing')
  }

  public async getQuizzesByTopic(topic_id: string): Promise<any[]> {
    const topic = await db.quizzes.findOne({ _id: topic_id }, { quizzes: 1 })
    if (!topic) throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
    return topic.quizzes
  }

  public async updateQuiz(
    topic_id: string,
    quiz_id: string,
    quizData: InputUpdateQuiz
  ): Promise<any> {
    const updatedTopic = await db.quizzes.findOneAndUpdate(
      { _id: topic_id, 'quizzes.quiz_id': quiz_id },
      { $set: { 'quizzes.$': quizData } },
      { new: true }
    )
    if (updatedTopic) return updatedTopic
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
  }

  public async deleteQuiz(topic_id: string, quiz_id: string): Promise<any> {
    const updatedTopic = await db.quizzes.findOneAndUpdate(
      { _id: topic_id },
      { $pull: { quizzes: { quiz_id } } },
      { new: true }
    )
    if (updatedTopic) return updatedTopic
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
  }

  public async addQuestionToQuiz(
    topic_id: string,
    quiz_id: string,
    questionData: InputCreateQuestion
  ): Promise<any> {
    const updatedTopic = await db.quizzes.findOneAndUpdate(
      { _id: topic_id, 'quizzes.quiz_id': quiz_id },
      { $push: { 'quizzes.$.questions': questionData } },
      { new: true }
    )
    if (updatedTopic) return updatedTopic
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
  }

  public async getQuestionsByQuiz(
    topic_id: string,
    quiz_id: string,
    count: number,
    difficulty: string
  ): Promise<any[]> {
    const topic = await db.quizzes.findOne(
      { _id: topic_id, topic_status: Constant.TOPIC_STATUS.ONGOING, 'quizzes.quiz_id': quiz_id },
      { 'quizzes.$': 1 }
    )
    if (!topic?.quizzes.length) throw new Error('Quiz not accessible, topic may not be ongoing')

    const questions = topic.quizzes[0].questions.filter(
      (q: { difficulty: string }) => q.difficulty === difficulty
    )
    return questions.slice(0, count)
  }

  public async updateQuestion(
    topic_id: string,
    quiz_id: string,
    question_id: string,
    questionData: InputUpdateQuestion
  ): Promise<any> {
    const updatedTopic = await db.quizzes.findOneAndUpdate(
      {
        _id: topic_id,
        'quizzes.quiz_id': quiz_id,
        'quizzes.questions.question_id': question_id
      },
      { $set: { 'quizzes.$[i].questions.$[j]': questionData } },
      {
        new: true,
        arrayFilters: [
          { 'i.quiz_id': quiz_id },
          { 'j.question_id': question_id }
        ]
      }
    )
    if (updatedTopic) return updatedTopic
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
  }

  public async deleteQuestion(
    topic_id: string,
    quiz_id: string,
    question_id: string
  ): Promise<any> {
    const updatedTopic = await db.quizzes.findOneAndUpdate(
      { _id: topic_id, 'quizzes.quiz_id': quiz_id },
      { $pull: { 'quizzes.$.questions': { question_id } } },
      { new: true }
    )
    if (updatedTopic) return updatedTopic
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
  }

  public async getRandomQuestion(): Promise<any> {
    const randomQuestion = await db.quizzes.aggregate([
      { $unwind: '$quizzes' },
      { $unwind: '$quizzes.questions' },
      { $sample: { size: 1 } },
      { $replaceRoot: { newRoot: '$quizzes.questions' } }
    ])

    if (!randomQuestion.length) {
      throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
    }

    return randomQuestion[0]
  }
}

export { QuizzesService }
