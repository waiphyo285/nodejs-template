const utils = require('@utils/index')
const container = require('@infrastructure/container/bootstrap')
const {
    renderPage,
    handleServiceResponse,
} = require('@utils/handlers/response.handler')

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
        let data = {}

        if (id) {
            const useCase = container.get('getTeacherByIdUseCase')
            const result = await useCase.execute({ id })
            data = result.success ? result.data : {}
        }

        const pages = {
            data: data.data || data || {},
            runPage: 'pages/teacher-entry',
            runProgram: 'academic.teacher.entry',
            runContent: 'teacher.entry',
        }
        renderPage(req.user, pages, res)
    }

    static create(req, res) {
        const { ['id']: _id, ...data } = req.body
        const useCase = container.get('createTeacherUseCase')
        const resultPromise = useCase.execute(data).then((result) => {
            if (result.success) {
                return { data: result.data }
            }
            throw new Error(result.error)
        })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static update(req, res) {
        const { ['id']: rmId, ...data } = req.body
        const useCase = container.get('updateTeacherUseCase')
        const resultPromise = useCase
            .execute({ id: rmId, data })
            .then((result) => {
                if (result.success) {
                    return { data: result.data }
                }
                throw new Error(result.error)
            })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }
}

module.exports = TeacherPageHandler
