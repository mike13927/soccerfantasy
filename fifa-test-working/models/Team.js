
'use strict'

module.exports = function(sequelize, DataTypes) {

  const Team = sequelize.define('Team', {

    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    title: {
      type: DataTypes.STRING
    }

  }, {

    // explicitly tell sequelize what the name of the table will be
    tableName: 'teams'

  })

  Team.associate = function (models) {
    Team.hasMany(models.Player)
  }

  return Team

}
