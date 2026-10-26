import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
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
    first_name: { type: String, default: '', trim: true },
    last_name: { type: String, default: '', trim: true },
    deleted_at: { type: Date, default: null },
  },
  {
    collection: 'users',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

userSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { deleted_at: null } })

export function registerUserModel() {
  return mongoose.models.User ?? mongoose.model('User', userSchema)
}
