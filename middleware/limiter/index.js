const rateLimit = require('express-rate-limit')

const rateLimiter = rateLimit({
    max: 1000,
    windowMs: 1 * 60 * 1000, // 1 min
    standardHeaders: true,
    legacyHeaders: false,
})

module.exports = { rateLimiter }
