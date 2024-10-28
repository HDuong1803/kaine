import { InputCreateQuestion, InputCreateQuiz, InputUpdateQuestion, InputUpdateQuiz } from '@app'
import { type Option } from '@constants'
import { logError, onError, onSuccess } from '@constants'
// import { AdminMiddleware, AuthMiddleware } from '@middlewares'
import { Singleton } from '@providers'
import { Request as ExpressRequest } from 'express'
import {
  Controller,
  Get,
  // Middlewares,
  Request,
  Route,
  // Security,
  Tags,
  Example,
  Post,
  Body,
  Put,
  Delete,
  Query
} from 'tsoa'

@Tags('Quizzes')
@Route('api')
// @Security({
//   authorization: []
// })
// @Middlewares([AuthMiddleware])
export class QuizzesController extends Controller {
  @Post('quiz')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async createQuiz(
    @Request() req: ExpressRequest,
    @Body() body: InputCreateQuiz
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().createQuiz(body)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Get('quiz/list')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async getAllQuizzes(@Request() req: ExpressRequest): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().getAllQuizzes()
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Get('quiz')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async getQuizById(
    @Request() req: ExpressRequest,
    @Query() quiz_id: string
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().getQuizById(quiz_id)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Put('quiz')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async updateQuiz(
    @Request() req: ExpressRequest,
    @Query() quiz_id: string,
    @Body() body: InputUpdateQuiz
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().updateQuiz(quiz_id, body)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Delete('quiz')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async deleteQuiz(
    @Request() req: ExpressRequest,
    @Query() quiz_id: string
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().deleteQuiz(quiz_id)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Post('quiz/question')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async addQuestionToQuiz(
    @Request() req: ExpressRequest,
    @Query() quiz_id: string,
    @Body() body: InputCreateQuestion
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().addQuestionToQuiz(quiz_id, body)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Delete('quiz/question')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async deleteQuestion(
    @Request() req: ExpressRequest,
    @Query() quiz_id: string,
    @Query() question_id: string
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().deleteQuestion(quiz_id, question_id)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Get('quiz/question')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async getQuestionsByQuiz(
    @Request() req: ExpressRequest,
    @Query() quiz_id: string,
    @Query() count: string,
    @Query() difficulty: string
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().getQuestionsByQuiz(quiz_id, parseInt(count), difficulty)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Put('quiz/question')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async updateQuestion(
    @Request() req: ExpressRequest,
    @Query() quiz_id: string,
    @Query() question_id: string,
    @Body() body: InputUpdateQuestion
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().updateQuestion(quiz_id, question_id, body)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Get('quiz/random-question')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async getRandomQuestion(
    @Request() req: ExpressRequest
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().getRandomQuestion()
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }
}
