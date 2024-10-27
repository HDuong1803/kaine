export interface InputCreateTopic {
  topic_name: string
  topic_description?: string
  topic_image?: string
  topic_status: boolean
}

export interface InputUpdateTopic {
  topic_name?: string
  topic_description?: string
  topic_image?: string
  topic_status?: boolean
}

export interface InputCreateQuiz {
  difficulty_level: 'easy' | 'medium' | 'hard'
  questions: Question[]
}

interface Question {
  question_id: string
  question_text: string
  options: string[]
  correct_answer: string
}

export interface InputUpdateQuiz {
  difficulty_level?: 'easy' | 'medium' | 'hard'
  questions?: Question[]
}

export interface InputCreateQuestion {
  question_id: string
  question_text: string
  options: string[]
  correct_answer: string
}

export interface InputUpdateQuestion {
  question_text?: string
  options?: string[]
  correct_answer?: string
}
