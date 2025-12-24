/**
 * Delete User Role Use Case
 */
class DeleteUserRoleUseCase {
    constructor(userRoleService) {
        this.userRoleService = userRoleService
    }

    async execute(request) {
        try {
            await this.userRoleService.deleteRole(request.id)
            return { success: true, message: 'Role deleted successfully' }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = DeleteUserRoleUseCase
