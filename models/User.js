const { DataTypes, Model } = require('sequelize')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const db = require('../config/database'),
	sequelize = db.sequelize,
	Sequelize = db.Sequelize

class User extends Model {
	setPassword(password) {
		this.passwordSalt = crypto.randomBytes(16).toString('hex')
		this.passwordHash = crypto
			.pbkdf2Sync(password, this.passwordSalt, 10000, 512, 'sha512')
			.toString('hex')
	}

	validatePassword(password) {
		const hash = crypto
			.pbkdf2Sync(password, this.passwordSalt, 10000, 512, 'sha512')
			.toString('hex')

		return hash === this.passwordHash
	}

	generateToken() {
		const today = new Date()
		const exp = new Date(today)
		exp.setDate(today.getDate() + 1)

		return jwt.sign(
			{
				id: this.id,
				email: this.email,
				name: this.name,
				identifier: this.identifier,
			},
			process.env.SECRET,
			{
				expiresIn: '1h',
			}
		)
	}

	getUser() {
		return {
			user: {
				id: this.id,
				identifier: this.identifier,
				name: this.name,
				email: this.email,
			},
		}
	}
}

User.init(
	{
		identifier: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'O nome é obrigatório',
				},
				notNull: {
					msg: 'O nome é obrigatório',
				},
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: 'OP e-mail é obrigatório',
				},
				notNull: {
					msg: 'O e-mail é obrigatório',
				},
				isEmail: {
					msg: 'Favor preencher um e-mail válido',
				},
			},
		},
		passwordHash: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'A senha é obrigatória',
				},
			},
		},
		passwordSalt: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'A senha é obrigatória',
				},
			},
		},
	},
	{
		sequelize,
		paranoid: true,
	}
)

module.exports = User
