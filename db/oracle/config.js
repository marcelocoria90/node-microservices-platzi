export default {
  user: process.env.NODE_ORACLEDB_USER,
  password: process.env.NODE_ORACLEDB_PASSWORD,
  connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING,
  poolMax: 10, // ajusta según tus necesidades
  poolMin: 2, // ajusta según tus necesidades
  poolIncrement: 2, // ajusta según tus necesidades
  poolTimeout: 60 // ajusta según tus necesidades
}
