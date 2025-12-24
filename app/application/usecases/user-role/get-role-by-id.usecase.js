/**
 * Get User Role By ID Use Case
 */
class GetUserRoleByIdUseCase {
    constructor(userRoleService) {
        this.userRoleService = userRoleService
    }

    async execute(request) {
        try {
            const role = await this.userRoleService.getRoleById(request.id)
            return { success: true, data: role }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = GetUserRoleByIdUseCase
