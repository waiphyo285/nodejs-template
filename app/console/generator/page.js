const utils = require('@utils/index')
const Controller = require('@controllers/generator')
const { renderPage, handleServiceResponse } = require('@utils/handlers/response')

class ControllerPageHandler {
    static list(req, res) {
        const pages = {
            runPage: 'pages/runnerPage-list',
            runProgram: 'menuList',
            runContent: 'menuList',
        }
        renderPage(req.user, pages, res)
    }

    static async entry(req, res) {
        const id = req.params.id
        const data = id ? await Controller.findById(id) : {}
        const pages = {
            data: data.data || {},
            runPage: 'pages/runnerPage-entry',
            runProgram: 'menuEntry',
            runContent: 'menuEntry',
        }
        renderPage(req.user, pages, res)
    }

    static create(req, res) {
        const { ['id']: _id, ...data } = req.body
        const resultPromise = Controller.create(data)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static update(req, res) {
        const { ['id']: rmId, ...data } = req.body
        const resultPromise = Controller.update(rmId, data)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }
}

module.exports = ControllerPageHandler
