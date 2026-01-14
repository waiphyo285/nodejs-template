const utils = require('@utils/index')
const container = require('@infrastructure/container/bootstrap')
const { handleServiceResponse } = require('@utils/handlers/response.handler')

class StudentPageHandler {
    static async list(req, res) {
        await res.renderPage('pages/student-list', {
            program: 'academic.student.list',
            content: 'student.list',
        })
    }

    static async entry(req, res) {
        const id = req.params.id
        let data = {}

        if (id) {
            const useCase = container.get('getStudentByIdUseCase')
            const result = await useCase.execute({ id })
            data = result.success ? result.data : {}
        }

        await res.renderPage('pages/student-entry', {
            program: 'academic.student.entry',
            content: 'student.entry',
            data: data.data || data || {},
        })
    }

    static create(req, res) {
        utils
            .removeImages(req.body.remove_images || [])
            .then((_res) => {
                req.body.images = req.body.images || []
                const { ['id']: _id, ...data } = req.body
                const useCase = container.get('createStudentUseCase')
                const resultPromise = useCase.execute(data).then((result) => {
                    if (result.success) {
                        return { data: result.data }
                    }
                    throw new Error(result.error)
                })
                handleServiceResponse(resultPromise, res)
            })
            .catch((error) => {
                req.body.images = req.body.images || []
                const { ['id']: _id, ...data } = req.body
                const useCase = container.get('createStudentUseCase')
                const resultPromise = useCase.execute(data).then((result) => {
                    if (result.success) {
                        return { data: result.data }
                    }
                    throw new Error(result.error)
                })
                handleServiceResponse(resultPromise, res)
            })
    }

    static update(req, res) {
        utils
            .removeImages(req.body.remove_images || [])
            .then((_res) => {
                const { ['id']: rmId, ...data } = req.body
                data.images = data.images || []
                const useCase = container.get('updateStudentUseCase')
                const resultPromise = useCase
                    .execute({ id: rmId, data })
                    .then((result) => {
                        if (result.success) {
                            return { data: result.data }
                        }
                        throw new Error(result.error)
                    })
                handleServiceResponse(resultPromise, res)
            })
            .catch((error) => {
                const { ['id']: rmId, ...data } = req.body
                data.images = data.images || []
                const useCase = container.get('updateStudentUseCase')
                const resultPromise = useCase
                    .execute({ id: rmId, data })
                    .then((result) => {
                        if (result.success) {
                            return { data: result.data }
                        }
                        throw new Error(result.error)
                    })
                handleServiceResponse(resultPromise, res)
            })
    }
}

module.exports = StudentPageHandler
