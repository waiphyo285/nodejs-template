require('dotenv').config()

const logMode = process.env.LOG_MODE

global.iamlog = {
    info: function (...args) {
        ;+logMode && console.log(...args)
    },
    warn: function (...args) {
        ;+logMode && console.warn(...args)
    },
    error: function (...args) {
        ;+logMode && console.error(...args)
    },
}