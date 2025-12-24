const rateLimit = require('express-rate-limit')

const getUserKey = (req) => {
    if (req.user && req.user.id) {
        return req.user.id.toString()
    }
    return req.ip
}

const appRateLimiter = rateLimit({
    max: 1000, // per IP
    windowMs: 1 * 60 * 1000, // 1 min
    standardHeaders: true,
    legacyHeaders: false,
})

const ipRateLimiter = rateLimit({
    max: 300, // per IP
    windowMs: 15 * 60 * 1000, // 15 minutes
    // keyGenerator: getUserKey, // use user ID, otherwise use IP
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            code: '429',
            message: 'Too Many Requests',
            description:
                'Your IP has exceeded the maximum number of requests allowed within the time limit.',
        })
    },
})

module.exports = { appRateLimiter, ipRateLimiter }
