// import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class UserController {
  constructor ({ model }) {
    this.userModel = model
  }

  list = async (_req, res, _next) => {
    try {
      const result = await this.userModel.list()
      const users = {
        rows: result.rows
      }
      res.status(200).json(users)
    } catch (e) {
      console.log(e)
    }
  }

  get = async (req, res, _next) => {
    try {
      const { id } = req.params
      const result = await this.userModel.get(id)
      const user = {
        rows: result.rows
      }
      res.status(200).json(user)
    } catch (e) {
      console.log(e)
    }
  }

  upsert = async (req, res, _next) => {
    try {
      const { body } = req
      const result = await this.userModel.upsert(body)
      res.status(200).json(result)
    } catch (e) {
      console.log(e)
    }
  }

  follow = async (req, res, _next) => {
    try {
      const { body } = req
      const result = await this.userModel.follow(body)
      res.status(200).json(result)
    } catch (e) {
      console.log(e)
    }
  }

  following = async (req, res, _next) => {
    try {
      const { id } = req.params
      const q = 'SELECT * FROM WEBAPI.wus_users WHERE us_iduser IN (SELECT us_iduser FROM WEBAPI.wuf_followers WHERE us_iduser = :id)'
      const binds = [id]
      const result = await this.userModel.query(binds, q)

      if (result) {
        res.status(200).json(result)
      } else {
        res.status(404).json({ message: 'No se encontraron usuarios seguidos' })
      }
    } catch (e) {
      console.log(e)
    }
  }
}
