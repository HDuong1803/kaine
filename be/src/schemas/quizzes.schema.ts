import mongoose, { Schema, type Document, type Types } from 'mongoose'

interface Question {
  difficulty: 'easy' | 'medium' | 'hard'
  question_id: Types.ObjectId
  question_text: string
  options: string[]
  correct_answer: string
}

interface Quiz {
  quiz_id: Types.ObjectId
  difficulty_level: 'easy' | 'medium' | 'hard'
  questions: Question[]
}

export interface TopicAttributes extends Document {
  topic_id: Types.ObjectId
  topic_name: string
  topic_description: string
  topic_image: string
  topic_status: 'ongoing' | 'upcoming' | 'ended'
  quizzes: Quiz[]
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

const quizSchema = new Schema<Quiz>({
  quiz_id: { type: Schema.Types.ObjectId, auto: true },
  difficulty_level: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  questions: { type: [questionSchema], required: true }
})

const topicSchema = new Schema<TopicAttributes>(
  {
    topic_id: { type: Schema.Types.ObjectId, auto: true, unique: true },
    topic_name: { type: String, required: true, index: true },
    topic_description: { type: String, required: true },
    topic_image: { type: String, required: true },
    topic_status: {
      type: String,
      enum: ['ongoing', 'upcoming', 'ended'],
      default: 'upcoming'
    },
    quizzes: { type: [quizSchema], required: true }
  },
  {
    timestamps: true
  }
)

export const quizzes = mongoose.model<TopicAttributes>('quizzes', topicSchema)
