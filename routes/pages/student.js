const utils = require('@utils/index')
const Student = require('@controllers/student')
const { renderPage, handleServiceResponse } = require('@utils/handlers/response')

class StudentPageHandler {
    static list(req, res) {
        const pages = {
            runPage: 'pages/student-list',
            runProgram: 'academic.student.list',
            runContent: 'student.list',
        }
        renderPage(req.user, pages, res)
    }

    static async entry(req, res) {
        const id = req.params.id
        const data = id ? await Student.findById(id) : {}
        const pages = {
            data: data.data || {},
            runPage: 'pages/student-entry',
            runProgram: 'academic.student.entry',
            runContent: 'student.entry',
        }
        renderPage(req.user, pages, res)
    }

    static create(req, res) {
        utils.removeImages(req.body.remove_images || [])
            .then((_res) => {
                req.body.images = req.body.images || []
                const { ['id']: _id, ...data } = req.body
                const resultPromise = Student.create(data)
                handleServiceResponse(resultPromise, utils.isEmptyObject, res)
            })
            .catch((error) => {
                console.error('Error removing images during create:', error)
                // Continue with creation even if image removal fails
                req.body.images = req.body.images || []
                const { ['id']: _id, ...data } = req.body
                const resultPromise = Student.create(data)
                handleServiceResponse(resultPromise, utils.isEmptyObject, res)
            })
    }

    static update(req, res) {
        utils.removeImages(req.body.remove_images || [])
            .then((_res) => {
                const { ['id']: rmId, ...data } = req.body
                data.images = data.images || []
                const resultPromise = Student.update(rmId, data)
                handleServiceResponse(resultPromise, utils.isEmptyObject, res)
            })
            .catch((error) => {
                console.error('Error removing images during update:', error)
                // Continue with update even if image removal fails
                const { ['id']: rmId, ...data } = req.body
                data.images = data.images || []
                const resultPromise = Student.update(rmId, data)
                handleServiceResponse(resultPromise, utils.isEmptyObject, res)
            })
    }
}

module.exports = StudentPageHandler