import mongoose from 'mongoose'
import {
  OPPORTUNITY_SOURCE,
  OPPORTUNITY_TYPE,
  SPORT,
} from './enums.js'

const opportunitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    event_date: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
    sport: { type: String, required: true, enum: SPORT },
    type: { type: String, required: true, enum: OPPORTUNITY_TYPE },
    price: { type: mongoose.Schema.Types.Decimal128, default: null },
    register_url: { type: String, default: null },
    description: { type: String, default: null },
    source: { type: String, required: true, enum: OPPORTUNITY_SOURCE },
    is_approved: { type: Boolean, default: false },
    is_featured: { type: Boolean, default: false },
  },
  {
    collection: 'opportunities',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

export function registerOpportunityModel() {
  return mongoose.models.Opportunity ?? mongoose.model('Opportunity', opportunitySchema)
}
