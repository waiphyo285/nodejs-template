const cookieSession = require('cookie-session')
const config = require('@config/index')

// get environment variables
const NODE_ENV = config.NODE_ENV
const COOKIE_SESSION = config.ETAVIRP.COOKIE_SESSION

const appCookieOption = {
    development: {
        maxAge: 8 * 60 * 60 * 1000, // 8h
    },
    production: {
        maxAge: 1 * 60 * 60 * 1000, // 1h
    },
}

const csrfCookieOption = {
    development: {
        signed: true,
        secure: false,
        sameSite: false,
        maxAge: 8 * 60 * 60 * 1000, // 8 hr
    },
    production: {
        signed: true,
        secure: true,
        sameSite: true,
        maxAge: 1 * 60 * 60 * 1000, // 1 hr
    },
}

const cookieConfig = cookieSession({
    name: 'session',
    keys: [COOKIE_SESSION],
    // Cookie Options
    ...appCookieOption[NODE_ENV],
})

module.exports = { cookieConfig, csrfCookieOption }
