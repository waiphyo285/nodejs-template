const config = require('./index')

const WHITELISTED = config.ETAVIRP.WHITELISTED
const whitelist = WHITELISTED ? WHITELISTED.split(',') : []

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
}

module.exports = { corsOptions }
