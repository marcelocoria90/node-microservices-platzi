import { createApp } from '../api/app.js'

import { UserModel } from '../db/oracle/models/user.js'

createApp({ model: [UserModel] })
