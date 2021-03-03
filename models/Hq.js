const { DataTypes, Model } = require('sequelize')
const db = require('../config/database'),
	sequelize = db.sequelize,
	Sequelize = db.Sequelize

class Hq extends Model {}

Hq.init({
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
    coverUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cbzUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    editor: {
        type: DataTypes.STRING,
        allowNull: true
    },
    year: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    qtdHqs: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    dateUpdated: {
        type: DataTypes.DATE,
        allowNull: true
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

module.exports = Hq
