import { Sequelize, DataTypes } from 'sequelize'
import * as path from 'path'
import { config } from 'dotenv'

config({
    path: path.join(__dirname, '../../.env'),
})

const dbUsername = `${process.env.DB_USERNAME}`
const dbPassword = `${process.env.DB_PASSWORD}`

const sequelize = new Sequelize('mxfood', dbUsername, dbPassword, {
    host: 'localhost',
    dialect: 'mysql',
})
export { sequelize, DataTypes }
