import 'dotenv/config'
import cors from 'cors'
import express from 'express'

import { registerAllModels } from './models/index.js'
import { connectDb } from './startup/db.js'

registerAllModels()

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

const PORT = Number(process.env.PORT)

async function main() {
  try {
    if (process.env.MONGO_URI) {
      await connectDb()
      console.log('[db] connected')
    }
  } catch (err) {
    console.error('[db]', err.message)
  }

  app.listen(PORT, () => {
    console.log(`CTP backend listening on http://localhost:${PORT}`)
  })
}

main()
