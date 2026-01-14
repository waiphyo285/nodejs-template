const container = require('@infrastructure/container/bootstrap')
const { handleServiceResponse } = require('@utils/handlers/response.handler')

class TeacherPageHandler {
    static async list(req, res) {
        await res.renderPage('pages/teacher-list', {
            program: 'academic.teacher.list',
            content: 'teacher.list',
        })
    }

    static async entry(req, res) {
        const id = req.params.id
        let data = {}

        if (id) {
            const useCase = container.get('getTeacherByIdUseCase')
            const result = await useCase.execute({ id })
            data = result.success ? result.data : {}
        }

        await res.renderPage('pages/teacher-entry', {
            program: 'academic.teacher.entry',
            content: 'teacher.entry',
            data: data.data || data || {},
        })
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
        handleServiceResponse(resultPromise, res)
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
        handleServiceResponse(resultPromise, res)
    }
}

module.exports = TeacherPageHandler
