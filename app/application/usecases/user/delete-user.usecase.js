/**
 * Delete User Use Case
 */
class DeleteUserUseCase {
    constructor(userService) {
        this.userService = userService
    }

    async execute(request) {
        try {
            await this.userService.deleteUser(request.id)
            return { success: true, message: 'User deleted successfully' }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = DeleteUserUseCase
