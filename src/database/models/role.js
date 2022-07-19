'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
   
    static associate({User}) {
     this.hasMany(User,{foreignKey:"roleId",as:"users"})
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
  Role.init({
    uuid:{
    type:DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4
    },
    roleName:{
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    tableName:"roles",
    modelName: 'Role',
  });
  return Role;
};