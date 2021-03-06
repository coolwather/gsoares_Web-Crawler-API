const { DataTypes, Model } = require('sequelize')
const db = require('../config/database'),
	sequelize = db.sequelize,
	Sequelize = db.Sequelize

class Page extends Model {}

Page.init({
    identifier: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'A url da HQ é obrigatória'
            },
            notNull: {
                msg: 'A url da HQ é obrigatória'
            },
            isUrl: {
                msg: 'Favor preencher uma url válida'
            },
        },
    },
    pageNumber: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, { sequelize, paranoid: true })

module.exports = Page
