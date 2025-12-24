const utils = require('@utils/index')
const UserRole = require('@controllers/user-role')
const { renderPage, handleServiceResponse } = require('@utils/handlers/response')
const programMenu = require('@resources/lang/menus/menu-en.json')

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

        let data = { data: { program: initProgram } } // new entry

        if (id) {
            // edit role
            data = await UserRole.findById(id)
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

        const pages = {
            data: data.data,
            runPage: 'pages/user-role-entry',
            runProgram: 'administrative.role.entry',
            runContent: 'system-role.entry',
        }

        renderPage(req.user, pages, res)
    }

    static create(req, res) {
        req.body.who_access = req.user.user_type
        const resultPromise = UserRole.create(req.body)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }

    static update(req, res) {
        const { ['id']: rmId, ...data } = req.body
        const resultPromise = UserRole.update(rmId, data)
        handleServiceResponse(resultPromise, utils.isEmptyObject, res)
    }
}

module.exports = UserRolePageHandler
