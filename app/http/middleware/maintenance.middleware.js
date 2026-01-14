const config = require('@config/index')

const maintenanceMode = (req, res, next) => {
    const isMaintenance = process.env.MAINTENANCE == 1

    if (isMaintenance) {
        const allowedIps = (process.env.ALLOWED_IPS || '').split(',')
        const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress

        if (allowedIps.includes(clientIp)) {
            return next()
        }

        res.status(503)
        return res.render('error/error', {
            status: 'Maintenance',
            title: 'Under Maintenance',
            message: 'We are currently performing scheduled maintenance. We will be back online shortly. Thank you for your patience!',
        })
    }

    next()
}

module.exports = { maintenanceMode }
