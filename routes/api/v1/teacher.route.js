const TeacherController = require('@controllers/teacher.controller')

class TeacherHandler {
    static find(req, res, next) {
        TeacherController.find(req, res, next)
    }

    static findById(req, res, next) {
        TeacherController.findById(req, res, next)
    }

    static findBy(req, res, next) {
        TeacherController.findBy(req, res, next)
    }

    static create(req, res, next) {
        TeacherController.create(req, res, next)
    }

    static update(req, res, next) {
        TeacherController.update(req, res, next)
    }

    static drop(req, res, next) {
        TeacherController.drop(req, res, next)
    }
}

module.exports = TeacherHandler
