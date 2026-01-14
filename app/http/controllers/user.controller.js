const { BaseController, execute } = require('./base.controller')
const socketClient = require('../../socket-client')

class UserController extends BaseController {
    constructor() {
        super({ entityName: 'User' })
    }

    remove(req, res) {
        socketClient.send(req.body.id)
        execute(this.useCaseMap.delete)
            .with({ id: req.body.id })
            .transform(() => ({ message: 'User deleted successfully' }))
            .send(res)
    }

    updateWithPass(req, res) {
        execute(this.useCaseMap.update)
            .with({ id: req.params.id, data: req.body })
            .send(res)
    }

    updateWithoutPass(req, res) {
        execute(this.useCaseMap.update)
            .with({ id: req.params.id, data: req.body })
            .onSuccess((result) => {
                req.user.theme = result.data.theme
                req.user.locale = result.data.locale
            })
            .send(res)
    }

    updateAccount(req, res) {
        execute(this.useCaseMap.update)
            .with({ id: req.user._id || req.user.id, data: req.body })
            .onSuccess((result) => {
                req.user.theme = result.data.theme
                req.user.locale = result.data.locale
            })
            .send(res)
    }

    toRouteHandlers() {
        return {
            ...super.toRouteHandlers(),
            remove: (req, res) => this.remove(req, res),
            updateWithPass: (req, res) => this.updateWithPass(req, res),
            updateWithoutPass: (req, res) => this.updateWithoutPass(req, res),
            updateAccount: (req, res) => this.updateAccount(req, res)
        }
    }
}

module.exports = new UserController().toRouteHandlers()
