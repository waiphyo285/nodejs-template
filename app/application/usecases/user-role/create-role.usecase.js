/**
 * Create User Role Use Case
 */
class CreateUserRoleUseCase {
    constructor(userRoleService) {
        this.userRoleService = userRoleService
    }

    async execute(request) {
        try {
            const role = await this.userRoleService.createRole(request)
            return { success: true, data: role }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = CreateUserRoleUseCase
