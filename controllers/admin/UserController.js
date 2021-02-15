const UserService = require('../../services/admin/UserService')

class UserController {
	static async createUser(req, res, next) {
		const { name, email, password } = req.body

		try {
			if (await UserService.EmailExists(email)) {
				return res.status(400).json({ error: 'E-mail já cadastrado' })
			}

            const userToCreate = {
                name,
                email,
                password
            }

            const user = await UserService.CreateUser(userToCreate)

            return res.status(201).json(user)
		} catch (err) {
			nnext(err)
		}
	}
}

module.exports = UserController
