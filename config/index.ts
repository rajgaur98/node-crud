export const config = {
  env: process.env.NODE_ENV,
  mysql: {
    database: process.env.MYSQL_DATABASE ?? '',
    username: process.env.MYSQL_USERNAME ?? '',
    password: process.env.MYSQL_PASSWORD ?? '',
    host: process.env.MYSQL_HOST ?? '',
    port: Number(process.env.MYSQL_PORT)
  }
}
