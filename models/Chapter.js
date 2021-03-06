const { DataTypes, Model } = require('sequelize')
const db = require('../config/database'),
	sequelize = db.sequelize,
	Sequelize = db.Sequelize

class Chapter extends Model {}

Chapter.init({
    identifier: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
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
    qtdPages: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    cbzUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    detailed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    downloaded: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    converted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    uploaded: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { sequelize, paranoid: true })

module.exports = Chapter
