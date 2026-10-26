import mongoose from 'mongoose'
import { RANKING_CATEGORY, RANKING_TREND, SPORT } from './enums.js'

const rankingSchema = new mongoose.Schema(
  {
    category: { type: String, required: true, enum: RANKING_CATEGORY },
    rank_position: { type: Number, required: true, min: 1 },
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      default: null,
      index: true,
    },
    player_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      default: null,
      index: true,
    },
    season: { type: String, required: true, trim: true },
    sport: { type: String, required: true, enum: SPORT },
    rating: { type: mongoose.Schema.Types.Decimal128, default: null },
    trend: { type: String, required: true, enum: RANKING_TREND },
  },
  {
    collection: 'rankings',
    timestamps: { createdAt: false, updatedAt: 'updated_at' },
  }
)

rankingSchema.index({ category: 1, season: 1, sport: 1 })

export function registerRankingModel() {
  return mongoose.models.Ranking ?? mongoose.model('Ranking', rankingSchema)
}
