const config = require('@config/index')
const { getProgram } = require('@utils/handlers/access-user.handler')
const { getContent } = require('@utils/handlers/get-content.handler')

class DashboardHandler {
    static async index(req, res, next) {
        const curUserProgram = await getProgram(req.user, 'dashboard.null.null')
        const getPageContent = await getContent(req.user.locale)

        console.log({
            card: {
                total_1: 100,
                total_2: 50,
                total_3: 25,
                total_4: 75,
            },
            barchart: [],
        },)

        res.render('pages/dashboard', {
            ...curUserProgram,
            app: config.APP,
            data: {
                card: {
                    total_1: 100,
                    total_2: 50,
                    total_3: 25,
                    total_4: 75,
                },
                barchart: [],
            },
            content: getPageContent,
        })
    }
}

module.exports = DashboardHandler
