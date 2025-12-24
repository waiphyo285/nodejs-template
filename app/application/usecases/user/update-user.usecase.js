/**
 * Update User Use Case
 */
class UpdateUserUseCase {
    constructor(userService) {
        this.userService = userService
    }

    async execute(request) {
        try {
            const user = await this.userService.updateUserWithPassword(
                request.id,
                request.data
            )
            return { success: true, data: user }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = UpdateUserUseCase
