import mongoose from 'mongoose'
import { SPORT } from './enums.js'

const playerSchema = new mongoose.Schema(
  {
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
      index: true,
    },
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    jersey_number: { type: Number, default: null },
    position: { type: String, default: null },
    class_year: { type: Number, default: null, min: 1900, max: 2100 },
    photo_path: { type: String, default: null },
    height: { type: String, default: null },
    bio: { type: String, default: null },
    is_visible: { type: Boolean, default: true },
    is_featured: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
  },
  {
    collection: 'players',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

playerSchema.index({ slug: 1 }, { unique: true, partialFilterExpression: { deleted_at: null } })

export function registerPlayerModel() {
  return mongoose.models.Player ?? mongoose.model('Player', playerSchema)
}
