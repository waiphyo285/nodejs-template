require('module-alias/register')

const fs = require('fs')
const path = require('path')
const cors = require('cors')
const express = require('express')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const passport = require('passport')

// app logger
require('@utils/logger.util')
require('@config/passport')

// database connections
require('@models/mysql/connection')

// app configs
const config = require('@config/index')

// app settings
const { langI18n } = require('@config/locale')
const { corsOptions } = require('@config/cors')
const { cookieConfig } = require('@config/cookies')
const { morganLogger } = require('@config/logger')

// app features
const { addParams } = require('@middleware/params.middleware')
const { ipRateLimiter } = require('@middleware/limiter.middleware')

// protect routes
const {
    tokenRouter,
    verifyToken,
} = require('@middleware/token/jwt-token.middleware')
const {
    csrfRouter,
    csrfProtection,
} = require('@middleware/token/csrf-token.middleware')

// api router
const authRouter = require('@routes/auth')
const apiV1Router = require('@routes/api/v1')
const fileRouter = require('@routes/files')
const pagesRouter = require('@routes/pages')

// socket setup
require('./app/socket')

// environment variables
const COOKIE_SECRET = config.ETAVIRP.COOKIE_SECRET

const app = express()

// view engine setup
// eslint-disable-next-line no-undef
app.set('views', path.join(__dirname, 'resources/views'))
app.set('view engine', 'pug')
app.set('trust proxy', 1)

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(COOKIE_SECRET))
app.use(cookieConfig)

app.use(morganLogger)
app.use(langI18n.middleware())

app.use(passport.initialize())
app.use(passport.session())

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')))

// set locals user & token
app.use(function (req, res, next) {
    res.locals.user = req.user
    next()
})

// rate limiters
app.use(['/dmar', '/file', '/api/v1'], ipRateLimiter)

// connect to api routes
app.use('/dmar', csrfRouter)
app.use('/dmar', tokenRouter)
app.use('/file', verifyToken, fileRouter)
app.use('/api/v1', verifyToken, addParams, apiV1Router)

// connect to page routes
app.use(authRouter)
app.use(addParams, pagesRouter)
// app.use(csrfProtection, addParams, pagesRouter)

// catch 404 and handle error
app.use(function (req, res, next) {
    next(createError(404))
})

// handle error page
app.use((err, req, res, next) => {
    iamlog.error(err)

    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)

    if (req.accepts('html')) {
        return res.render('error/404')
    }

    if (req.accepts('json')) {
        return res.json({ error: err.message })
    }

    res.type('txt').send(err.message)
})

module.exports = app
