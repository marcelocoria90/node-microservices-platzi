import OracleDB from 'oracledb'
import { executeQuery } from '../index.js'
// import { v4 as uuid } from 'uuid'

export class UserModel {
  static async list () {
    try {
      const columns = 'us_iduser, us_name, us_email'
      const query = `SELECT ${columns} FROM WEBAPI.wus_users`
      const binds = []

      const options = {
        outFormat: OracleDB.OUT_FORMAT_OBJECT
      }

      const result = await executeQuery(query, binds, options)
      return result
    } catch (e) {
      console.error('⛔ Error en UserModel.list:', e)
      throw e
    }
  }

  static async get (id) {
    try {
      const columns = 'us_iduser, us_name, us_lastname, us_email'
      const query = `SELECT ${columns} FROM WEBAPI.wus_users WHERE us_iduser = :id`
      const binds = [id]

      const options = {
        outFormat: OracleDB.OUT_FORMAT_OBJECT
      }

      const result = await executeQuery(query, binds, options)
      return result
    } catch (e) {
      console.error('⛔ Error en UserModel.get:', e)
      throw e
    }
  }

  static async insert (user) {
    try {
      const query = 'INSERT INTO WEBAPI.wus_users (us_iduser, us_name, us_email) VALUES (:id, :name, :email)'
      const binds = [user.id, user.name, user.email]

      const options = {
        autoCommit: true
      }

      const result = await executeQuery(query, binds, options)
      return result
    } catch (e) {
      console.error('⛔ Error en UserModel.insert:', e)
      throw e
    }
  }

  static async update (user) {
    try {
      const query = 'UPDATE WEBAPI.wus_users SET us_name = :name, us_lastname = :lastname, us_email = :email WHERE us_iduser = :id'
      const binds = [user.name, user.lastname, user.email, user.id]

      const options = {
        autoCommit: true
      }

      const result = await executeQuery(query, binds, options)
      return result
    } catch (e) {
      console.error('⛔ Error en UserModel.update:', e)
      throw e
    }
  }

  static async upsert (user) {
    try {
      console.log('🚩 user', user)
      const query = 'MERGE INTO WEBAPI.wus_users USING DUAL ON (us_iduser = :id) WHEN MATCHED THEN UPDATE SET us_name = :name, us_email = :email WHEN NOT MATCHED THEN INSERT (us_iduser, us_name, us_email, us_password) VALUES (:id, :name, :email, :password)'
      const binds = [user.id, user.name, user.email, user.id, user.name, user.email, user.password]

      const options = {
        autoCommit: true
      }

      const result = await executeQuery(query, binds, options)
      return result
    } catch (e) {
      console.error('⛔ Error en UserModel.upsert:', e)
      throw e
    }
  }

  static async query (q, binds = []) {
    try {
      const options = {
        outFormat: OracleDB.OUT_FORMAT_OBJECT
      }
      const result = await executeQuery(q, binds, options)
      return result
    } catch (e) {
      console.error('⛔ Error en UserModel.query:', e)
      throw e
    }
  }

  static async follow (user) {
    try {
      const ciduser = user.iduser
      const ciduserfollower = user.iduserfollower
      const query = 'MERGE INTO WEBAPI.wuf_usersfollowers USING DUAL ON (uf_iduser = :iduser AND uf_iduserfollower = :iduserfollower) WHEN NOT MATCHED THEN INSERT (uf_iduser, uf_iduserfollower) VALUES (:iduser, :iduserfollower)'
      const binds = [ciduser, ciduserfollower, user.iduser, user.iduserfollower]

      const options = {
        autoCommit: true
      }

      const result = await executeQuery(query, binds, options)
      return result
    } catch (e) {
      console.error('⛔ Error en UserModel.follow:', e)
      throw e
    }
  }
}
