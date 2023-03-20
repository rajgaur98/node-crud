import {
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  DataTypes
} from 'sequelize'
import { sequelize } from '../lib/db'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: string
  declare name: string
  declare email: string
  declare age: number
  declare phone?: string
  declare createdAt: string
  declare updatedAt: string
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.NUMBER, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    tableName: 'users',
    sequelize
  }
)

export { User }
