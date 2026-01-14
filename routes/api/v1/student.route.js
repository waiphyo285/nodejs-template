const StudentController = require('@controllers/student.controller')

class StudentHandler {
    static find(req, res, next) {
        StudentController.find(req, res, next)
    }

    static findById(req, res, next) {
        StudentController.findById(req, res, next)
    }

    static findBy(req, res, next) {
        StudentController.findBy(req, res, next)
    }

    static create(req, res, next) {
        StudentController.create(req, res, next)
    }

    static update(req, res, next) {
        StudentController.update(req, res, next)
    }

    static drop(req, res, next) {
        StudentController.drop(req, res, next)
    }
}

module.exports = StudentHandler
