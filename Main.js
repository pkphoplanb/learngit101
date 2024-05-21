const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('pkto_asset', 'your_user', 'your_password', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    pool: {
        max: 2,
        min: 0,
        idle: 10000,
        acquire: 30000
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Department = require('./Department')(sequelize, Sequelize)
db.BudgetSource = require('./BudgetSource')(sequelize, Sequelize)
db.AssetCategory = require('./AssetCategory')(sequelize, Sequelize)
db.AssetType = require('./AssetType')(sequelize, Sequelize)
db.AssetItems = require('./AssetItems')(sequelize, Sequelize)
db.AssetStatus = require('./AssetStatus')(sequelize, Sequelize)
db.Asset = require('./Asset')(sequelize, Sequelize)
db.Users = require('./Users')(sequelize, Sequelize)

// Associations
db.AssetCategory.hasMany(db.AssetType, { foreignKey: { name: 'cate_pk', allowNull: false } });
db.AssetType.belongsTo(db.AssetCategory, { foreignKey: { name: 'cate_pk', allowNull: false } });

db.AssetType.hasMany(db.AssetItems, { foreignKey: { name: 'type_pk', allowNull: false } });
db.AssetItems.belongsTo(db.AssetType, { foreignKey: { name: 'type_pk', allowNull: false } });

db.AssetItems.hasMany(db.Asset, { foreignKey: { name: 'item_pk', allowNull: false } });
db.Asset.belongsTo(db.AssetItems, { foreignKey: { name: 'item_pk', allowNull: false } });

module.exports = db