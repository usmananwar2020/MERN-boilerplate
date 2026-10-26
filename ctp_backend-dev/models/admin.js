import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      default: null,
      select: false,
    },
    deleted_at: { type: Date, default: null },
  },
  {
    collection: 'admins',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

adminSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { deleted_at: null } })

export function registerAdminModel() {
  return mongoose.models.Admin ?? mongoose.model('Admin', adminSchema)
}
