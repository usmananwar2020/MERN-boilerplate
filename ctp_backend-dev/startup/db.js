import mongoose from 'mongoose'

export async function connectDb(uri = process.env.MONGO_URI) {
  if (!uri) throw new Error('MongoDB URI missing: set MONGO_URI')
  return mongoose.connect(uri)
}
