const utils = require('@utils/index')
const User = require('@controllers/user')
const { renderPage, handleServiceResponse } = require('@utils/handlers/response')

class UserPageHandler {
    static get_user(req, res) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
        res.send({ user: req.user })
    }

    static list(req, res) {
        const pages = {
            runPage: 'pages/user-list',
            runProgram: 'administrative.user.list',
            runContent: 'system-user.list',
        }
        renderPage(req.user, pages, res)
    }

    static async entry(req, res) {
        const id = req.params.id
        const data = id ? await User.findById(id) : {}
        const pages = {
            data: data.data || {},
            runPage: 'pages/user-entry',
            runProgram: 'administrative.user.entry',
            runContent: 'system-user.entry',
        }
        renderPage(req.user, pages, res)
    }

    static create(req, res) {
        const resultPromise = User.create(req.body)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static update(req, res) {
        const { ['id']: rmId, ...data } = req.body
        const resultPromise = User.updateWithPass(rmId, data)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }
}

module.exports = UserPageHandler
