import mongoose from 'mongoose'
import { SPORT } from './enums.js'

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    logo_path: { type: String, default: null },
    season: { type: String, required: true, trim: true },
    sport: { type: String, required: true, enum: SPORT },
    record_w: { type: Number, default: 0 },
    record_l: { type: Number, default: 0 },
    is_pilot: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
  },
  {
    collection: 'teams',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

teamSchema.index({ slug: 1 }, { unique: true, partialFilterExpression: { deleted_at: null } })

export function registerTeamModel() {
  return mongoose.models.Team ?? mongoose.model('Team', teamSchema)
}
