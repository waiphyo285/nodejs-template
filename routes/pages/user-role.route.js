const utils = require('@utils/index')
const container = require('@infrastructure/container/bootstrap')
const programMenu = require('@resources/lang/menus/menu-en.json')
const {
    renderPage,
    handleServiceResponse,
} = require('@utils/handlers/response.handler')

class UserRolePageHandler {
    static list(req, res) {
        const pages = {
            runPage: 'pages/user-role-list',
            runProgram: 'administrative.role.list',
            runContent: 'system-role.list',
        }
        renderPage(req.user, pages, res)
    }

    static async entry(req, res) {
        const id = req.params.id
        const initProgram = JSON.parse(JSON.stringify(programMenu))

        let data = { data: { program: initProgram } }

        if (id) {
            const useCase = container.get('getRoleByIdUseCase')
            const result = await useCase.execute({ id })

            if (result.success) {
                data = result.data
                const userProgram = data.data.program

                data.data.program = initProgram.map((initMenu) => {
                    const findMenu = userProgram.find(
                        (userMenu) => userMenu.menuid == initMenu.menuid
                    )

                    let subMenuMap

                    if (findMenu) {
                        subMenuMap = initMenu.submenu.map((initSubMenu) => {
                            const findSubMenu = findMenu.submenu.find(
                                (userSubMenu) =>
                                    userSubMenu.menuid == initSubMenu.menuid
                            )
                            return { ...initSubMenu, ...findSubMenu }
                        })
                    }
                    return { ...initMenu, ...findMenu, submenu: subMenuMap }
                })
            }
        }

        const pages = {
            data: data.data || {},
            runPage: 'pages/user-role-entry',
            runProgram: 'administrative.role.entry',
            runContent: 'system-role.entry',
        }

        renderPage(req.user, pages, res)
    }

    static create(req, res) {
        req.body.who_access = req.user.user_type
        const useCase = container.get('createRoleUseCase')
        const resultPromise = useCase.execute(req.body).then((result) => {
            if (result.success) {
                return { data: result.data }
            }
            throw new Error(result.error)
        })
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static update(req, res) {
        const { ['id']: rmId, ...data } = req.body
        const useCase = container.get('updateRoleUseCase')
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

module.exports = UserRolePageHandler
