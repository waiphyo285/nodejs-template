/**
 * Find User Roles Use Case
 */
class FindUserRolesUseCase {
    constructor(userRoleService) {
        this.userRoleService = userRoleService
    }

    async execute(request) {
        try {
            const roles = await this.userRoleService.findRoles(request)
            return { success: true, data: roles }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = FindUserRolesUseCase
