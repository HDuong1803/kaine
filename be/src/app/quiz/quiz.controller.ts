import { InputCreateQuestion, InputCreateQuiz, InputCreateTopic, InputUpdateQuestion, InputUpdateQuiz, InputUpdateTopic, type IUser } from '@app'
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
  @Post('topic')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async createTopic(
    @Request() req: ExpressRequest,
    @Body() body: InputCreateTopic
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().createTopic(body)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Put('topic')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async updateTopic(
    @Request() req: ExpressRequest,
    @Body() body: InputUpdateTopic,
    @Query() topic_id: string
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().updateTopic(topic_id, body)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Get('topic')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async getQuiz(
    @Request() req: ExpressRequest,
    @Query() topic_id: string
  ): Promise<Option<IUser>> {
    try {
      const result = await Singleton.getQuizzesInstance().getTopicById(topic_id)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Get('topic/list')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async getAllTopics(@Request() req: ExpressRequest): Promise<Option<IUser>> {
    try {
      const result = await Singleton.getQuizzesInstance().getAllTopics()
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Delete('topic')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async deleteTopic(
    @Request() req: ExpressRequest,
    @Query() topic_id: string
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().deleteTopic(topic_id)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Post('topic/quiz')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async addQuizToTopic(
    @Request() req: ExpressRequest,
    @Query() topic_id: string,
    @Body() body: InputCreateQuiz
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().addQuizToTopic(topic_id, body)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Get('topic/quiz')
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
    @Query() topic_id: string,
    @Query() quiz_id: string
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().getQuizById(topic_id, quiz_id)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Get('topic/quiz/list')
  @Example<any>(
    {
      data: {},
      success: true,
      message: 'Success',
      count: 1
    },
    'Success'
  )
  public async getQuizzesByTopic(
    @Request() req: ExpressRequest,
    @Query() topic_id: string
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().getQuizzesByTopic(topic_id)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Put('topic/quiz')
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
    @Query() topic_id: string,
    @Query() quiz_id: string,
    @Body() body: InputUpdateQuiz
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().updateQuiz(topic_id, quiz_id, body)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Delete('topic/quiz')
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
    @Query() topic_id: string,
    @Query() quiz_id: string
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().deleteQuiz(topic_id, quiz_id)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Post('topic/quiz/question')
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
    @Query() topic_id: string,
    @Query() quiz_id: string,
    @Body() body: InputCreateQuestion
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().addQuestionToQuiz(topic_id, quiz_id, body)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Delete('topic/quiz/question')
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
    @Query() topic_id: string,
    @Query() quiz_id: string,
    @Query() question_id: string
  ): Promise<Option<any>> {
    try {
      const result = Singleton.getQuizzesInstance().deleteQuestion(topic_id, quiz_id, question_id)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Get('topic/quiz/question')
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
    @Query() topic_id: string,
    @Query() quiz_id: string,
    @Query() count: string,
    @Query() difficulty: string
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().getQuestionsByQuiz(topic_id, quiz_id, parseInt(count), difficulty)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Put('topic/quiz/question')
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
    @Query() topic_id: string,
    @Query() quiz_id: string,
    @Query() question_id: string,
    @Body() body: InputUpdateQuestion
  ): Promise<Option<any>> {
    try {
      const result = await Singleton.getQuizzesInstance().updateQuestion(topic_id, quiz_id, question_id, body)
      return onSuccess(result)
    } catch (error: any) {
      logError(error, req)
      return onError(error, this)
    }
  }

  @Get('topic/quiz/random-question')
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
