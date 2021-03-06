const User = require('./User')
const Site = require('./Site')
const Hq = require('./Hq')
const Chapter = require('./Chapter')
const Page = require('./Page')

Site.hasMany(Hq, {
    as: 'Hqs'
})
Hq.hasMany(Chapter, {
    as: 'Chapters'
})
Chapter.hasMany(Page, {
    as: 'Pages'
})
Hq.belongsTo(Site, {
    as: 'Site',
    foreignKey: {
        allowNull: false
    }
})
Chapter.belongsTo(Hq, {
    as: 'Hq',
    foreignKey: {
        allowNull: false
    }
})
Page.belongsTo(Chapter, {
    as: 'Chapter',
    foreignKey: {
        allowNull: false
    }
})
