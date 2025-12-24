const Sequelize = require('sequelize')
const config = require('../../../config')

// Set environment variables
const env = config.NODE_ENV || 'development'
const host = config.MYSQL.HOST || 'localhost'
const port = config.MYSQL.PORT || 3306
const user = config.MYSQL.USER || 'root'
const pass = config.MYSQL.PASS || 'root'
const dbName = config.ETAVIRP.DATABASE || 'nodeapi_starter2'

const dialect = config.MYSQL.DIALECT
const pool_min = config.MYSQL.POOL_MIN
const pool_max = config.MYSQL.POOL_MAX
const pool_idl = config.MYSQL.POOL_IDL
const pool_acq = config.MYSQL.POOL_ACQ

const database = (module.exports = {})

const instance = new Sequelize(dbName, user, pass, {
    host: host,
    port: port,
    dialect: dialect,
    operatorsAliases: 0,
    pool: {
        min: Number(pool_min),
        max: Number(pool_max),
        idle: Number(pool_idl),
        acquire: Number(pool_acq),
    },
    logging: false,
})

database.Sequelize = Sequelize
database.sequelize = instance

// Import models
database.teachers = require('./schemas/teacher.schema')(instance, Sequelize)
database.students = require('./schemas/student.schema')(instance, Sequelize)

// Sync database
database.sequelize
    .sync({ alter: true })
    .then(() => {
        console.info(`Database: 😃 MySQL (${env}) is connected!`)
    })
    .catch((error) =>
        console.error('Database: 😡 MySQL connection error', error)
    )
