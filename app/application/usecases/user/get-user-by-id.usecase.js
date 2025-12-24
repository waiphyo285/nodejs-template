/**
 * Get User By ID Use Case
 */
class GetUserByIdUseCase {
    constructor(userService) {
        this.userService = userService
    }

    async execute(request) {
        try {
            const user = await this.userService.getUserById(request.id)
            return { success: true, data: user }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = GetUserByIdUseCase
