import mongoose from 'mongoose'
import { STAT_IMPORT_SOURCE } from './enums.js'

const playerGameStatSchema = new mongoose.Schema(
  {
    player_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
      required: true,
    },
    game_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Game',
      required: true,
    },
    stats: { type: mongoose.Schema.Types.Mixed, required: true, default: {} },
    imported_via: { type: String, required: true, enum: STAT_IMPORT_SOURCE },
  },
  {
    collection: 'player_game_stats',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

playerGameStatSchema.index({ player_id: 1, game_id: 1 }, { unique: true })

export function registerPlayerGameStatModel() {
  return mongoose.models.PlayerGameStat ?? mongoose.model('PlayerGameStat', playerGameStatSchema)
}
