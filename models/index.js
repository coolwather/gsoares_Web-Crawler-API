const User = require('./User')
const Site = require('./Site')
const Hq = require('./Hq')

Site.hasMany(Hq, {
    as: 'Hqs'
})
Hq.belongsTo(Site, {
    as: 'Site',
    foreignKey: {
        allowNull: false
    }
})
