import { Router } from 'express'
import { UserController } from './controller.js'

export const userRouter = ({ model }) => {
  const router = Router()
  const controller = new UserController({ model })

  router.get('/', controller.list)
  //   router.get('/:id', controller.get)
  router.post('/', controller.upsert)
  //   router.put('/:id', controller.update)

  return router
}
