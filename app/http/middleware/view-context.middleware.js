const config = require('@config/index')
const { getProgram } = require('@utils/handlers/access-user.handler')
const { getContent } = require('@utils/handlers/get-content.handler')

const viewContext = async (req, res, next) => {
    res.locals.app = config.APP
    res.locals.user = req.user || {}

    const locale = req.user?.locale || config.APP.LOCALES || 'en_US'
    res.locals.content = await getContent(locale)

    res.locals.scripts = []
    res.locals.styles = []

    res.renderPage = async (view, { program, content, data, options } = {}) => {
        if (program) {
            const programData = await getProgram(req.user, program)
            Object.assign(res.locals, programData)
        }

        if (content) {
            const contentKeys = content.split('.')
            const contentPage = contentKeys.shift()
            res.locals.content = {
                ...res.locals.content,
                ...(await getContent(locale, contentPage, contentKeys)),
            }
        }

        return res.render(view, { data, ...options })
    }

    next()
}

module.exports = viewContext
