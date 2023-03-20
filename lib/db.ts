import { Sequelize } from 'sequelize'
import { config } from '../config'

const sequelize = new Sequelize(
  config.mysql.database,
  config.mysql.username,
  config.mysql.password,
  {
    host: config.mysql.host,
    port: config.mysql.port,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 120000
    }
  }
)

export { sequelize }
