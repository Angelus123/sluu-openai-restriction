'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamMembers extends Model {
  
    static associate({TeamProfile}) {
    this.belongsTo(TeamProfile,{foreignKey:"teamId",as:"team"})
    }
  }
  TeamMembers.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    firstName:{
      type:DataTypes.STRING,
      allowNull: false
    },
    lastName:{
    type:DataTypes.STRING,
    allowNull: false
    },
    email:{
    type:DataTypes.STRING,
    allowNull:false
    },
    password:{
    type:DataTypes.STRING,
    allowNull:false
    },
    profilePic:{
      type:DataTypes.STRING,
    },
    devType:{
    type:DataTypes.STRING,
    allowNull:false
    },
    teamId:{
    type:DataTypes.INTEGER,
    
    },
    teamName:{
    type:DataTypes.STRING,
    
    }
  }, {
    sequelize,
    tableName:"teammembers",
    modelName: 'TeamMembers',
  });
  return TeamMembers;
};