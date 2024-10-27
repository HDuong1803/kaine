import mongoose, { Schema } from 'mongoose'

export interface StakeAttributes {
  stake_id: string
}

const stakeSchema = new Schema<StakeAttributes>({
  stake_id: String
})

export const stake = mongoose.model('stake', stakeSchema, undefined, {
  overwriteModels: true
})
