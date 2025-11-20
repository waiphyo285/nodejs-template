const express = require('express')
const router = express.Router()
const async = require('async')
const config = require('@config/index')
const checkAuth = require('@middleware/dto/is-valid-user')
const { getProgram } = require('@utils/handlers/access-user')
const { getContent } = require('@utils/handlers/get-content')

// Import Models

const dashboardCard = async () => {
    const countUser = function (callback) {
        // Simple dummy stat for template dashboard
        callback(undefined, 0)
    }

    const countRole = function (callback) {
        // Simple dummy stat for template dashboard
        callback(undefined, 0)
    }

    const countStudent = function (callback) {
        // Simple dummy stat for template dashboard
        callback(undefined, 0)
    }

    return [countUser, countRole, countStudent]
}

router.get('/', checkAuth, async (req, res, next) => {
    async.parallel(await dashboardCard(), async function (error, results) {
        const curUserProgram = await getProgram(req.user, 'dashboard.null.null')
        const getPageContent = await getContent(req.user.locale, 'dashboard', [])

        const cardDefaults = {
            total_amount: 0,
            total_item: 0,
            total_invoice: 0,
            total_customer: 0,
        }

        const cardResult = cardDefaults
        const barchartResult = []

        res.render('pages/dashboard', {
            ...curUserProgram,
            app: config.APP,
            data: {
                card: cardResult,
                barchart: barchartResult,
            },
            content: getPageContent,
        })
    })
})

module.exports = router
