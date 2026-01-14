const mongoose = require('mongoose')

const config = require('@config')
const clr = require('@utils/config/logcolor.config')

mongoose.Promise = global.Promise

const env = config.NODE_ENV || 'development'
const isProd = env === 'production'

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: !isProd,
    maxPoolSize: config.MONGO.POOL_SIZE || 100,
    minPoolSize: config.MONGO.MIN_POOL_SIZE || 10,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 5000,
    heartbeatFrequencyMS: 10000,
}

// Connection URLs
const host = config.MONGO.HOST || 'localhost'
const port = config.MONGO.PORT || 27017
const user = config.MONGO.USER || 'root'
const pass = config.MONGO.PASS || 'no-pass'
const dbName = config.ETAVIRP.DATABASE || 'no_db'

const connect_urls = {
    development: `mongodb://${host}:${port}/${dbName}`,
    production: `mongodb://${user}:${pass}@${host}:${port}/${dbName}?authSource=admin`,
    testing: `mongodb://${host}:${port}/${dbName}_test`,
}

// Create connection
const dbConnect = async () => {
    try {
        await mongoose.connect(connect_urls[env], mongoOptions)
    } catch (err) {
        console.error(`${clr.fg.red}Database: 😡 MongoDB connection failed:`, err)
        process.exit(1)
    }
}

// Remove connection
const dbDisconnect = async () => {
    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close()
        }
    } catch (err) {
        console.error('Error during MongoDB disconnect:', err)
    }
}

// Init connection
dbConnect()

// Signal connection
mongoose.connection
    .once('open', function () {
        console.info(
            `${clr.fg.magenta}Database: 😃 MongoDB (${env}) is connected!`
        )
    })
    .on('error', function (error) {
        console.error(
            `${clr.fg.red}Database: 😡 MongoDB connection error`,
            error
        )
    })
    .on('disconnected', function () {
        console.warn(`${clr.fg.yellow} Database: 😡 MongoDB is disconnected`)
    })

module.exports = { mongoose, dbConnect, dbDisconnect }
