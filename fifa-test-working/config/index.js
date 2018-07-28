module.exports = {
  development: {
    username: "root",
    password: null,
    database: "ucbproject3",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: null
  },
  test: {
    username: "root",
    password: null,
    database: "ucbproject3_test",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: null // don't show the SQL queries when running tests
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql"
  },
}
