import mongoose from 'mongoose'
import { GAME_RESULT } from './enums.js'

const gameSchema = new mongoose.Schema(
  {
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
      index: true,
    },
    opponent: { type: String, required: true, trim: true },
    game_date: { type: Date, required: true },
    location: { type: String, default: null },
    result: { type: String, required: true, enum: GAME_RESULT },
    score: { type: String, required: true, trim: true },
    set_scores: { type: mongoose.Schema.Types.Mixed, required: true, default: {} },
    hudl_video_url: { type: String, default: null },
    is_featured: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
  },
  {
    collection: 'games',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

export function registerGameModel() {
  return mongoose.models.Game ?? mongoose.model('Game', gameSchema)
}
