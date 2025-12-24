const cookieSession = require('cookie-session')
const config = require('@config/index')

const NODE_ENV = config.NODE_ENV
const COOKIE_SESSION = config.ETAVIRP.COOKIE_SESSION
const COOKIE_MAX_AGE = 8 * 60 * 60 * 1000

const appCookieOption = {
    development: {
        maxAge: COOKIE_MAX_AGE,
    },
    production: {
        maxAge: COOKIE_MAX_AGE,
    },
}

const csrfCookieOption = {
    development: {
        signed: true,
        secure: false,
        sameSite: false,
        maxAge: COOKIE_MAX_AGE,
    },
    production: {
        signed: true,
        secure: true,
        sameSite: true,
        maxAge: COOKIE_MAX_AGE,
    },
}

const cookieConfig = cookieSession({
    name: 'session',
    keys: [COOKIE_SESSION],
    ...appCookieOption[NODE_ENV],
})

module.exports = { cookieConfig, csrfCookieOption }
