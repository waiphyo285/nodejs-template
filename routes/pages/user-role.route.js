const container = require('@infrastructure/container/bootstrap')
const programMenu = require('@resources/lang/menus/menu-en.json')
const { handleServiceResponse } = require('@utils/handlers/response.handler')

class UserRolePageHandler {
    static async list(req, res) {
        await res.renderPage('pages/user-role-list', {
            program: 'administrative.role.list',
            content: 'system-role.list',
        })
    }

    static async entry(req, res) {
        const id = req.params.id
        const initProgram = JSON.parse(JSON.stringify(programMenu))

        let data = { data: { program: initProgram } }

        if (id) {
            const useCase = container.get('getRoleByIdUseCase')
            const result = await useCase.execute({ id })

            if (result.success) {
                const roleData = result.data || result
                const userProgram =
                    roleData.program || roleData.data?.program || []

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

                data.data = {
                    ...roleData,
                    program: data.data.program,
                }
            }
        }

        await res.renderPage('pages/user-role-entry', {
            program: 'administrative.role.entry',
            content: 'system-role.entry',
            data: data.data || {},
        })
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
        handleServiceResponse(resultPromise, res)
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
        handleServiceResponse(resultPromise, res)
    }
}

module.exports = UserRolePageHandler
