module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define('Department', {
    dep_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dep_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    org_code: {
      type: Sequelize.STRING(5),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  return Department;
}