import mongoose, { Schema, type Document, type Types } from 'mongoose'

interface Question {
  difficulty: 'easy' | 'medium' | 'hard'
  question_id: Types.ObjectId
  question_text: string
  options: string[]
  correct_answer: string
}

export interface QuizzesAttributes extends Document {
  quizzes_id: Types.ObjectId
  quizzes_name: string
  quizzes_description: string
  quizzes_image: string
  quizzes_status: 'ongoing' | 'upcoming' | 'ended'
  questions: Question[]
}

const questionSchema = new Schema<Question>({
  question_id: { type: Schema.Types.ObjectId, auto: true },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  question_text: { type: String, required: true },
  options: { type: [String], required: true },
  correct_answer: { type: String, required: true }
})

const quizzesSchema = new Schema<QuizzesAttributes>(
  {
    quizzes_id: { type: Schema.Types.ObjectId, auto: true },
    quizzes_name: { type: String, required: true, index: true },
    quizzes_description: { type: String, required: true },
    quizzes_image: { type: String, required: true },
    quizzes_status: {
      type: String,
      enum: ['ongoing', 'upcoming', 'ended'],
      default: 'upcoming'
    },
    questions: { type: [questionSchema], required: true }
  },
  {
    timestamps: true
  }
)

export const quizzes = mongoose.model<QuizzesAttributes>('quizzes', quizzesSchema)
