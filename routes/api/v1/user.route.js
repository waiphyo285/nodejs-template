const UserController = require('@controllers/user.controller')

class UserHandler {
    static find(req, res, next) {
        UserController.find(req, res, next)
    }

    static findById(req, res, next) {
        UserController.findById(req, res, next)
    }

    static create(req, res, next) {
        UserController.create(req, res, next)
    }

    static remove(req, res, next) {
        UserController.remove(req, res, next)
    }

    static updateWithPass(req, res, next) {
        UserController.updateWithPass(req, res, next)
    }

    static updateWithoutPass(req, res, next) {
        UserController.updateWithoutPass(req, res, next)
    }

    static drop(req, res, next) {
        UserController.drop(req, res, next)
    }
}

module.exports = UserHandler
