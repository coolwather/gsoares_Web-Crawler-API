const { DataTypes, Model } = require('sequelize')
const db = require('../config/database'),
	sequelize = db.sequelize,
	Sequelize = db.Sequelize

class Site extends Model {}

Site.init(
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
		url: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: 'A URL é obrigatória',
				},
				notNull: {
					msg: 'A URL é obrigatória',
				},
				isUrl   : {
					msg: 'Favor preencher uma UR válida',
				},
			},
		},
		qtdHqs: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        dateLastUpdate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: new Date()
        }
	},
	{
		sequelize,
		paranoid: true,
	}
)

module.exports = Site
