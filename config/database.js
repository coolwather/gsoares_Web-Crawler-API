const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        benchmark: true,
        logQueryParameters: true,
        define: {
            freezeTableName: true
        },
    }
)

// sequelize.sync({ alter: true }).then(() => {

// }).catch(error => {
//     console.log(error)
// })

var db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
