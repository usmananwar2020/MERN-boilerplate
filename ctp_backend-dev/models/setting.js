import mongoose from 'mongoose'

const settingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    value: { type: String, required: true },
  },
  {
    collection: 'settings',
    timestamps: { createdAt: false, updatedAt: 'updated_at' },
  }
)

export function registerSettingModel() {
  return mongoose.models.Setting ?? mongoose.model('Setting', settingSchema)
}
