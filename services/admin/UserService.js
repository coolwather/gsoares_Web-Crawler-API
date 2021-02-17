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

	static async Login(email, password) {
		const user = await User.findOne({ where: { email } })

		if (user) {
			if (user.validatePassword(password)) {
				const token = user.generateToken()

				return {
					token,
					user: user.getUser(),
				}
			} else {
				return null
			}
		} else {
			return null
		}
	}

	static async UpdateUser(id, name, email) {
        const user = await User.findByPk(id)

		if (user) {
			if (user.email !== email) {
				if (await UserService.EmailExists(email)) {
					throw { errorCode: '002', message: 'E-mail já cadastrado' }
				}

                user.email = email
                user.name = name

                await user.save()

                return user.getUser()
			}
		} else {
			throw { errorCode: '001', message: 'Usuário não encontrado' }
		}
	}

	static async UpdatePassword(userId, password) {
		const user = await User.findByPk(userId)

		if(user) {
			user.setPassword(password)
			await user.save()

			return user.getUser()
		} else {
			throw { errorCode: '001', message: 'Usuário não encontrado'}
		}
	}
}

module.exports = UserService
