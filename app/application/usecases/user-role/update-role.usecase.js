/**
 * Update User Role Use Case
 */
class UpdateUserRoleUseCase {
    constructor(userRoleService) {
        this.userRoleService = userRoleService
    }

    async execute(request) {
        try {
            const role = await this.userRoleService.updateRole(
                request.id,
                request.data
            )
            return { success: true, data: role }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = UpdateUserRoleUseCase
