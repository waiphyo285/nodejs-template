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
const { requestFilter } = require('@middleware/request-filter.middleware')
const { ipRateLimiter } = require('@middleware/rate-limiter.middleware')
const { maintenanceMode } = require('@middleware/maintenance.middleware')

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

const viewContext = require('@middleware/view-context.middleware')

// maintenance mode check
app.use(maintenanceMode)

// Set global view context
app.use(viewContext)

// rate limiters
app.use(['/dmar', '/file', '/api/v1'], ipRateLimiter)

// connect to api routes
app.use('/dmar', csrfRouter)
app.use('/dmar', tokenRouter)
app.use('/file', verifyToken, fileRouter)
app.use('/api/v1', verifyToken, requestFilter, apiV1Router)

// connect to page routes
app.use(authRouter)
app.use(requestFilter, pagesRouter)
// app.use(csrfProtection, requestFilter, pagesRouter)

// catch 404 and handle error
app.use(function (req, res, next) {
    next(createError(404))
})

// handle error page
app.use((err, req, res, next) => {
    iamlog.error(err)

    const status = err.status || 500
    res.status(status)

    let title = 'Something went wrong'
    let message = 'An unexpected error occurred. Our team has been notified and is working on a fix.'

    if (status === 404) {
        title = 'Page Not Found'
        message = "Oops! The page you are looking for doesn't exist or has been moved to another URL."
    } else if (status === 403) {
        title = 'Access Forbidden'
        message = "Sorry, you don't have permission to access this page. Please contact your administrator."
    }

    if (req.accepts('html')) {
        return res.render('error/error', {
            status,
            title,
            message,
            error: req.app.get('env') === 'development' ? err : {},
        })
    }

    if (req.accepts('json')) {
        return res.json({
            error: {
                status,
                message: err.message,
                details: req.app.get('env') === 'development' ? err : undefined,
            },
        })
    }

    res.type('txt').send(`${status} - ${err.message}`)
})

module.exports = app
