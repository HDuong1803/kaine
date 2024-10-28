import { type InputUpdateQuiz, type InputCreateQuiz, type InputCreateQuestion, type InputUpdateQuestion } from '@app'
import { Constant } from '@constants'
import { db } from '@providers'

class QuizzesService {
  public async createQuiz(body: InputCreateQuiz): Promise<any> {
    const newQuiz = await db.quizzes.create(body)
    return newQuiz
  }

  public async getQuizById(quiz_id: string): Promise<any> {
    const quiz = await db.quizzes.findOne({ _id: quiz_id })
    if (quiz) return quiz
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
  }

  public async getAllQuizzes(page = 1, limit = 5): Promise<any[]> {
    const skip = (page - 1) * limit
    return await db.quizzes.find({}).skip(skip).limit(limit)
  }

  public async updateQuiz(quiz_id: string, body: InputUpdateQuiz): Promise<any> {
    const { ...data } = body
    const updatedQuiz = await db.quizzes.findOneAndUpdate(
      { _id: quiz_id },
      data,
      {
        new: true
      }
    )
    if (updatedQuiz) return updatedQuiz
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
  }

  public async deleteQuiz(quiz_id: string): Promise<boolean> {
    const result = await db.quizzes.deleteOne({ _id: quiz_id })
    return result.deletedCount > 0
  }

  public async addQuestionToQuiz(quiz_id: string, questionData: InputCreateQuestion): Promise<any> {
    const updatedQuiz = await db.quizzes.findOneAndUpdate(
      { _id: quiz_id },
      { $push: { questions: questionData } },
      { new: true }
    )
    if (updatedQuiz) return updatedQuiz
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
  }

  public async getQuestionsByQuiz(quiz_id: string, count: number, difficulty: string): Promise<any[]> {
    const quiz = await db.quizzes.findOne(
      { _id: quiz_id, quizzes_status: Constant.QUIZZES_STATUS.ONGOING },
      { questions: 1 }
    )
    if (!quiz) throw new Error('Quiz not accessible or is not ongoing')

    const questions = quiz.questions.filter(
      (q: { difficulty: string }) => q.difficulty === difficulty
    )
    return questions.slice(0, count)
  }

  public async updateQuestion(
    quiz_id: string,
    question_id: string,
    questionData: InputUpdateQuestion
  ): Promise<any> {
    const updatedQuiz = await db.quizzes.findOneAndUpdate(
      {
        _id: quiz_id,
        'questions.question_id': question_id
      },
      { $set: { 'questions.$': questionData } },
      { new: true }
    )
    if (updatedQuiz) return updatedQuiz
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
  }

  public async deleteQuestion(quiz_id: string, question_id: string): Promise<any> {
    const updatedQuiz = await db.quizzes.findOneAndUpdate(
      { _id: quiz_id },
      { $pull: { questions: { question_id } } },
      { new: true }
    )
    if (updatedQuiz) return updatedQuiz
    throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
  }

  public async getRandomQuestion(): Promise<any> {
    const randomQuestion = await db.quizzes.aggregate([
      { $unwind: '$questions' },
      { $sample: { size: 1 } },
      { $replaceRoot: { newRoot: '$questions' } }
    ])

    if (!randomQuestion.length) {
      throw new Error(Constant.NETWORK_STATUS_MESSAGE.NOT_FOUND)
    }

    return randomQuestion[0]
  }
}

export { QuizzesService }
