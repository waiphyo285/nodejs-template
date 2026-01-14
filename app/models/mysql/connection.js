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

const isProd = env === 'production'

const database = (module.exports = {})

const instance = new Sequelize(dbName, user, pass, {
    host: host,
    port: port,
    dialect: dialect,
    logging: isProd ? false : console.log,
    benchmark: !isProd,
    retry: {
        match: [
            /Sequence timeout/,
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/,
            /TimeoutError/,
        ],
        max: 3,
    },
    pool: {
        min: Number(pool_min) || 5,
        max: Number(pool_max) || 20,
        idle: Number(pool_idl) || 10000,
        acquire: Number(pool_acq) || 30000,
        evict: 1000,
    },
})

database.Sequelize = Sequelize
database.sequelize = instance

database.teachers = require('./schemas/teacher.schema')(instance, Sequelize)
database.students = require('./schemas/student.schema')(instance, Sequelize)

const syncOptions = isProd ? { alter: false } : { alter: true }

database.sequelize
    .authenticate()
    .then(() => {
        console.info(`Database: 😃 MySQL (${env}) connection authenticated!`)
        return database.sequelize.sync(syncOptions)
    })
    .then(() => {
        console.info(`Database: 😃 MySQL tables synced!`)
    })
    .catch((error) => {
        console.error('Database: 😡 MySQL connection error:', error)
        if (isProd) process.exit(1)
    })
