import { createApp } from '../api/app.js'
// import { initDb } from '../db/oracle/index.js'

import { UserModel } from '../db/oracle/models/user.js'

// initDb()

createApp({ model: [UserModel] })
