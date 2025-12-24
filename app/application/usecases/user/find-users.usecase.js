/**
 * Find Users Use Case
 */
class FindUsersUseCase {
    constructor(userService) {
        this.userService = userService
    }

    async execute(request) {
        try {
            const users = await this.userService.findUsers(request)
            return { success: true, data: users }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }
}

module.exports = FindUsersUseCase
