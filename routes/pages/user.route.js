const container = require('@infrastructure/container/bootstrap')
const { handleServiceResponse } = require('@utils/handlers/response.handler')

class UserPageHandler {
    static get_user(req, res) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
        res.send({ user: req.user })
    }

    static async account(req, res) {
        await res.renderPage('pages/account', {
            program: 'administrative.user.entry',
            content: 'system-user.entry',
            data: req.user || {},
        })
    }

    static updateAccount(req, res) {
        const { ['id']: rmId, ...data } = req.body
        const useCase = container.get('updateUserUseCase')
        const resultPromise = useCase
            .execute({ id: req.user._id || req.user.id, data })
            .then((result) => {
                if (result.success) {
                    return { data: result.data }
                }
                throw new Error(result.error)
            })
        handleServiceResponse(resultPromise, res)
    }

    static async list(req, res) {
        await res.renderPage('pages/user-list', {
            program: 'administrative.user.list',
            content: 'system-user.list',
        })
    }

    static async entry(req, res) {
        const id = req.params.id
        let data = {}

        if (id) {
            const useCase = container.get('getUserByIdUseCase')
            const result = await useCase.execute({ id })
            data = result.success ? result.data : {}
        }

        await res.renderPage('pages/user-entry', {
            program: 'administrative.user.entry',
            content: 'system-user.entry',
            data: data.data || data || {},
        })
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
