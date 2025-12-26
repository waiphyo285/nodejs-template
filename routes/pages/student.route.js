const utils = require('@utils/index')
const container = require('@infrastructure/container/bootstrap')
const {
    renderPage,
    handleServiceResponse,
} = require('@utils/handlers/response.handler')

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
        let data = {}

        if (id) {
            const useCase = container.get('getStudentByIdUseCase')
            const result = await useCase.execute({ id })
            data = result.success ? result.data : {}
        }

        const pages = {
            data: data.data || data || {},
            runPage: 'pages/student-entry',
            runProgram: 'academic.student.entry',
            runContent: 'student.entry',
        }
        renderPage(req.user, pages, res)
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
                console.error('Error removing images during create:', error)
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
                console.error('Error removing images during update:', error)
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
