const User = require('../../models/User')

class UserService {
	static async EmailExists(email, oldEmail = null) {
		if (oldEmail === null || email !== oldEmail) {
			const user = await User.findOne({ where: { email } })

			if (user) {
				return true
			}

			return false
		}

		return false
	}

    static async CreateUser(user) {
        const password = user.password
        const userToCreate = User.build(user)
        userToCreate.setPassword(password)

        await userToCreate.save()
        const userToReturn = userToCreate.getUser()

        return userToReturn
    }
}

module.exports = UserService
