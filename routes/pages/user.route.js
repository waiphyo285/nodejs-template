const container = require('@infrastructure/container/bootstrap')
const {
    renderPage,
    handleServiceResponse,
} = require('@utils/handlers/response.handler')

class UserPageHandler {
    static get_user(req, res) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
        res.send({ user: req.user })
    }

    static list(req, res) {
        const pages = {
            runPage: 'pages/user-list',
            runProgram: 'administrative.user.list',
            runContent: 'system-user.list',
        }
        renderPage(req.user, pages, res)
    }

    static async entry(req, res) {
        const id = req.params.id
        let data = {}

        if (id) {
            const useCase = container.get('getUserByIdUseCase')
            const result = await useCase.execute({ id })
            data = result.success ? result.data : {}
        }

        const pages = {
            data: data.data || data || {},
            runPage: 'pages/user-entry',
            runProgram: 'administrative.user.entry',
            runContent: 'system-user.entry',
        }
        renderPage(req.user, pages, res)
    }

    static create(req, res) {
        const useCase = container.get('createUserUseCase')
        const resultPromise = useCase.execute(req.body).then((result) => {
            if (result.success) {
                return { data: result.data }
            }
            throw new Error(result.error)
        })
        handleServiceResponse(resultPromise, res)
    }

    static update(req, res) {
        const { ['id']: rmId, ...data } = req.body
        const useCase = container.get('updateUserUseCase')
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

module.exports = UserPageHandler
