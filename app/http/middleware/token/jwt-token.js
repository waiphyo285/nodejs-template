const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('@config/index')
const authConfig = require('@config/auth')
const { createApiResponse } = require('@utils/handlers/response')

const NODE_ENV = config.NODE_ENV

// ==============================
// RSA KEYS
// ==============================

const publicKey = fs.readFileSync(
    path.join(__dirname, '../../../../storage/keys/public.key'),
    { encoding: 'utf-8' }
)

const privateKey = fs.readFileSync(
    path.join(__dirname, '../../../../storage/keys/private.key'),
    { encoding: 'utf-8' }
)

// ==============================
// PERMISSION
// ==============================

const sumPermission = (role) => {
    return authConfig.userRoleAccess[role]
        .split(',')
        .reduce((sum, cur) => +sum + +cur, 0)
}

// ==============================
// RESPONSE
// ==============================

const authorized = (res, locales, data) => {
    return res.status(200).json(createApiResponse(200, { data }, locales))
}

const unauthorized = (res, locales) => {
    return res.status(401).json(createApiResponse(401, {}, locales))
}

// ==============================
// ENCRYPT / DECRYPT
// ==============================

const encryptData = (message) => {
    const algorithm = authConfig.encodeAlg
    const initVectr = crypto.randomBytes(16)
    const secretKey = crypto.randomBytes(32)
    const cipher = crypto.createCipheriv(algorithm, secretKey, initVectr)

    return {
        init_vectr: initVectr.toString('base64'),
        secret_key: secretKey.toString('base64'),
        random: cipher.update(message, 'utf-8', 'hex') + cipher.final('hex'),
    }
}

const decryptData = ({ init_vectr, secret_key, random }) => {
    const algorithm = authConfig.encodeAlg
    const initVectr = Buffer.from(init_vectr, 'base64')
    const secretKey = Buffer.from(secret_key, 'base64')
    const decipher = crypto.createDecipheriv(algorithm, secretKey, initVectr)

    return decipher.update(random, 'hex', 'utf-8') + decipher.final('utf8')
}

// ==============================
// HASH TIME
// ==============================

const encryptTime = (req, res) => {
    const time = encryptData(`${Date.now()}`)
    const locales = res.locals.i18n.translations
    req.body.method = req.body.method_id || req.body.method

    checkPayload(req.body)
        ? authorized(res, locales, { data: time })
        : unauthorized(res, locales)
}

// ==============================
// PAYLOAD CHECK
// ==============================

const checkPayload = ({ username, password, userrole, method }) => {
    return (
        authConfig.defineUserRole.indexOf(userrole) !== -1 &&
        authConfig.mockedUsername === username &&
        authConfig.mockedPassword === password &&
        method
    )
}

// ==============================
// SIGN METHODS
// ==============================

const signJwtToken = {
    method_1: (payload) => {
        return jwt.sign(payload, authConfig.jwtSecret, {
            expiresIn: authConfig.jwtExpiry,
        })
    },
    method_2: (payload) => {
        return jwt.sign(payload, privateKey, authConfig.signOption)
    },
}

// ==============================
// REFRESH TOKEN SIGN
// ==============================

const signRefreshToken = {
    method_1: (payload) => {
        return jwt.sign({ ...payload, type: 'refresh' }, authConfig.jwtSecret, {
            expiresIn: authConfig.refreshExpiry,
        })
    },
    method_2: (payload) => {
        return jwt.sign(
            { ...payload, type: 'refresh' },
            privateKey,
            authConfig.refreshSignOption
        )
    },
}

// ==============================
// GET SIGN METHOD
// ==============================

const getSignMethod = (obj, { username, userrole, method }) => {
    const signJwtMethod = {
        eno: () => obj.method_1({ username, userrole }),
        owt: () => obj.method_2({ username, userrole }),
    }
    return signJwtMethod[method]()
}

// ==============================
// GENERATE TOKEN
// ==============================

const generateToken = (req, res) => {
    const datetime = Date.now()
    const timehash = req.query.timehash
    req.body.method = req.body.method_id || req.body.method

    const locales = res.locals.i18n.translations
    const prevtime = decryptData({ ...req.body, random: timehash })

    if (datetime - prevtime > 60000 || !checkPayload(req.body)) {
        return unauthorized(res, locales)
    }

    const payload = {
        username: req.body.username,
        userrole: req.body.userrole,
        method: req.body.method,
    }

    const accessToken = getSignMethod(signJwtToken, {
        ...payload,
    })

    const refreshToken = getSignMethod(signRefreshToken, {
        ...payload,
    })

    return authorized(res, locales, {
        token: accessToken,
        accessToken,
        refreshToken,
    })
}

// ==============================
// VERIFY TOKEN
// ==============================

const verifyJwtToken = {
    method_1: (token) => {
        return jwt.verify(token, authConfig.jwtSecret, (err, decode) =>
            err ? null : decode
        )
    },
    method_2: (token) => {
        return jwt.verify(
            token,
            publicKey,
            authConfig.signOption,
            (err, decode) => (err ? null : decode)
        )
    },
}

// ==============================
// VERIFY REFRESH TOKEN
// ==============================

const verifyRefreshToken = {
    method_1: (token) => {
        return jwt.verify(token, authConfig.jwtSecret, (err, decode) =>
            err || decode.type !== 'refresh' ? null : decode
        )
    },
    method_2: (token) => {
        return jwt.verify(
            token,
            publicKey,
            authConfig.refreshSignOption,
            (err, decode) => (err || decode.type !== 'refresh' ? null : decode)
        )
    },
}

// ==============================
// GET VERIFY METHOD
// ==============================

const getVerifyMethod = (obj, { token, method }) => {
    const verifyJwtMethod = {
        eno: () => obj.method_1(token),
        owt: () => obj.method_2(token),
    }
    return verifyJwtMethod[method]()
}

// ==============================
// ACCESS TOKEN MIDDLEWARE
// ==============================

const checkJwtToken = (req, res, next) => {
    let token = req.headers['authorization']
    let method = req.headers['x-access-method']
    const locales = res.locals.i18n.translations

    if (NODE_ENV === 'testing') return next()

    token = token && token.startsWith('Bearer ') ? token.slice(7) : null

    if (!token || !method) {
        return unauthorized(res, locales)
    }

    const decode = getVerifyMethod(verifyJwtToken, { token, method })

    if (!decode) {
        return unauthorized(res, locales)
    }

    req.headers.userrole = decode.userrole
    next()
}

// ==============================
// REFRESH TOKEN
// ==============================

const refreshToken = (req, res) => {
    let token = req.headers['authorization']
    let method = req.headers['x-access-method']
    const locales = res.locals.i18n.translations

    token = token && token.startsWith('Bearer ') ? token.slice(7) : null

    if (!token || !method) {
        return unauthorized(res, locales)
    }

    const decoded = getVerifyMethod(verifyRefreshToken, {
        token,
        method,
    })

    if (!decoded) {
        return unauthorized(res, locales)
    }

    const payload = {
        username: decoded.username,
        userrole: decoded.userrole,
        method: method,
    }
    const accessToken = getSignMethod(signJwtToken, payload)

    const refreshToken = getSignMethod(signRefreshToken, payload)

    return authorized(res, locales, {
        token: accessToken,
        accessToken,
        refreshToken,
    })
}

// ==============================
// AUTHORIZATION
// ==============================

const isAuth = (targets) => {
    return (req, res, next) => {
        const curRole = req.headers.userrole
        const locales = res.locals.i18n.translations
        const curTarget = targets.find((target) => target === curRole)
        const targetAccess = sumPermission(curTarget || 'developer')
        const permitAccess = sumPermission(curRole)

        permitAccess >= targetAccess ? next() : unauthorized(res, locales)
    }
}

// ==============================
// ROUTES
// ==============================

router.post('/hash-time', encryptTime)
router.post('/get-token', generateToken)
router.post('/rfh-token', refreshToken)

// ==============================
// EXPORT
// ==============================

module.exports = {
    isAuth,
    tokenRouter: router,
    verifyToken: checkJwtToken,
    signToken_1: signJwtToken.method_1,
    signToken_2: signJwtToken.method_2,
    signRefreshToken_1: signRefreshToken.method_1,
    signRefreshToken_2: signRefreshToken.method_2,
}
