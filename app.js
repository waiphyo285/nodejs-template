require('module-alias/register')

const fs = require('fs')
const path = require('path')
const cors = require('cors')
const express = require('express')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const passport = require('passport')

// app logger
require('@utils/logger')
// passport local auth
require('@config/settings/passport')

// app configs
const config = require('@config/index')

// app settings
const { corsOptions } = require('@config/settings/cors')
const { cookieConfig } = require('@config/settings/cookies')
const { morganLogger } = require('@config/settings/logger')
const { langI18n } = require('@config/settings/locale')

// protect routes
const { tokenRouter } = require('@middleware/token/jwt-token')
const { verifyToken } = require('@middleware/token/jwt-token')
const {
    csrfRouter,
    csrfProtection: doubleCsrfProtection,
} = require('@middleware/token/csrf-token')

// app features
const { addParams } = require('@middleware/params/index')
const { rateLimiter } = require('@middleware/limiter/index')

// api router
const genRouter = require('./generator')
const authRouter = require('@src/routes/auth')
const apiV1Router = require('@src/routes/api/v1')
const apiV2Router = require('@src/routes/api/v2')
const fileRouter = require('@src/routes/files')

require('./socket')

// get environment variables
const COOKIE_SECRET = config.ETAVIRP.COOKIE_SECRET

const app = express()
const routeModules = []

// view engine setup
// eslint-disable-next-line no-undef
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(COOKIE_SECRET))
app.use(cookieConfig)

app.use(rateLimiter)
app.use(morganLogger)
app.use(langI18n.middleware())

app.use(passport.initialize())
app.use(passport.session())

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')))

// set routes module
// eslint-disable-next-line no-undef
fs.readdirSync(__dirname + '/src/routes/pages').forEach(function (name) {
    // eslint-disable-next-line no-undef
    const obj = require(path.join(__dirname, '/src/routes/pages/' + name))
    routeModules.push(obj)
})

// set locals user & token
app.use(function (req, res, next) {
    res.locals.user = req.user
    next()
})

// connect to api routes
app.use('/dmar', csrfRouter)
app.use('/dmar', tokenRouter)
app.use('/file', verifyToken, addParams, fileRouter)
app.use('/api/v1', verifyToken, addParams, apiV1Router) // mongo
app.use('/api/v2', verifyToken, addParams, apiV2Router) // mysql

// connect to page routes
app.use(genRouter)
app.use(authRouter)
app.use(addParams, routeModules)
// app.use(doubleCsrfProtection, addParams, routeModules)

// catch 404 and handle error
app.use(function (req, res, next) {
    next(createError(404))
})

// handle error page
app.use(function (err, req, res) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    iamlog.error('Catch err ', err)
    res.status(err.status || 500)
    // eslint-disable-next-line no-undef
    res.sendFile('./views/404/index.html', { root: __dirname })
})

module.exports = app
