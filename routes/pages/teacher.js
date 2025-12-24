const utils = require('@utils/index')
const Teacher = require('@controllers/teacher')
const { renderPage, handleServiceResponse } = require('@utils/handlers/response')

class TeacherPageHandler {
    static list(req, res) {
        const pages = {
            runPage: 'pages/teacher-list',
            runProgram: 'academic.teacher.list',
            runContent: 'teacher.list',
        }
        renderPage(req.user, pages, res)
    }

    static async entry(req, res) {
        const id = req.params.id
        const data = id ? await Teacher.findById(id) : {}
        const pages = {
            data: data.data || {},
            runPage: 'pages/teacher-entry',
            runProgram: 'academic.teacher.entry',
            runContent: 'teacher.entry',
        }
        renderPage(req.user, pages, res)
    }

    static create(req, res) {
        const { ['id']: _id, ...data } = req.body
        const resultPromise = Teacher.create(data)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static update(req, res) {
        const { ['id']: rmId, ...data } = req.body
        const resultPromise = Teacher.update(rmId, data)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }
}

module.exports = TeacherPageHandler