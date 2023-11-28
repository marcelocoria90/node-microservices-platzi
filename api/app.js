import express, { json } from 'express'
import 'dotenv/config'
import morgan from 'morgan'

import { initDb } from '../db/oracle/index.js'

import { userRouter } from './components/user/routes.js'

initDb()

export const createApp = ({ model }) => {
  const app = express()
  app.use(json())
  app.disable('x-powered-by')
  app.use(morgan('dev'))

  app.use('/api/users', userRouter({ model: model[0] }))

  const PORT = process.env.PORT || 3000

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} 🚀`)
  })
}
