'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamProfile extends Model {
    
    static associate({TeamMembers}) {
     this.hasMany(TeamMembers,{foreignKey:"teamId",as:"members"})
    }
    toJSON(){
      return {
        ...this.get(),
        id:undefined,
        createdAt:undefined,
        updatedAt:undefined
      }
    }
  }
  TeamProfile.init({
    uuid:{
      type:DataTypes.STRING,
      defaultValue:DataTypes.UUIDV4
    },
    company:{
      type:DataTypes.STRING,
      allowNull: false
    },
    name:{
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName:"teamprofiles",
    modelName: 'TeamProfile',
  });
  return TeamProfile;
};