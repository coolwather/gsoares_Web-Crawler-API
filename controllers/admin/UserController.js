const UserService = require('../../services/admin/UserService')

class UserController {
	static async index(req, res, next) {
		try {
			const users = await UserService.GetUsers()

			return res.status(200).send(users)
		} catch (err) {
			next(err)
		}
	}

	static async getUser(req, res, next) {
		const { id } = req.params

        try {
            const user = await UserService.GetUserById(id)

            return res.status(200).send(user)
        } catch(err) {
            next(err)
        }
	}

	static async createUser(req, res, next) {
		const { name, email, password } = req.body

		try {
			if (await UserService.EmailExists(email)) {
				return res.status(400).json({ error: 'E-mail já cadastrado' })
			}

			const userToCreate = {
				name,
				email,
				password,
			}

			const user = await UserService.CreateUser(userToCreate)

			return res.status(201).json(user)
		} catch (err) {
			nnext(err)
		}
	}

	static async login(req, res, next) {
		const { email, password } = req.body

		try {
			const user = await UserService.Login(email, password)

			if (user) {
				res.status(200).send(user)
			} else {
				res.status(404).send({
					error: 'Erro ao efetuar o login, favor tentar novamente!!',
				})
			}
		} catch (err) {
			next(err)
		}
	}

	static async updateUser(req, res, next) {
		const { email, name } = req.body
		const userId = req.userId

		try {
			const updatedUser = await UserService.UpdateUser(
				userId,
				name,
				email
			)

			return res.status(200).json(updatedUser)
		} catch (err) {
			next(err)
		}
	}

	static async updatePassword(req, res, next) {
		const { password } = req.body
		const userId = req.userId

		try {
			const updatedUser = await UserService.UpdatePassword(
				userId,
				password
			)

			return res.status(200).json(updatedUser)
		} catch (err) {
			next(err)
		}
	}

	static async deleteUser(req, res, next) {
		const { id } = req.params

		try {
			await UserService.Delete(id)

			res.status(200).json({ deleted: true })
		} catch (err) {
			next(err)
		}
	}
}

module.exports = UserController
