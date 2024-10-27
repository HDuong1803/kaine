import mongoose, { Schema } from 'mongoose'

export interface TaskAttributes {
  task_id: string
}

const taskSchema = new Schema<TaskAttributes>({
  task_id: String
})

export const task = mongoose.model('task', taskSchema, undefined, {
  overwriteModels: true
})
