/* eslint-disable no-async-promise-executor */
import oracledb from 'oracledb'
import config from './config.js'

let cnxPool

export const initDb = async () => {
  try {
    const connectionPool = await oracledb.createPool(config)
    cnxPool = connectionPool
    console.log(`💡🍀Connection ${config.connectString}🍀💡`)
  } catch (e) {
    console.error(e)
  }
}

initDb()

export const getConnection = async () => {
  try {
    const cnx = await cnxPool.getConnection()
    return cnx
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const executeQuery = async (sql, binds = [], options = {}) => {
  return await new Promise(async (resolve, reject) => {
    let connection
    try {
      connection = await getConnection()
      const result = await connection.execute(sql, binds, options)
      resolve(result)
    } catch (error) {
      reject(error)
    } finally {
      if (connection) {
        try {
          await connection.close()
        } catch (error) {
          console.error('Error closing Oracle connection:', error)
        }
      }
    }
  })
}
