'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
  
    static associate({User}) {
     this.hasMany(User, {foreignKey: "uuid", as: "chats"});
    }


    toJSON(){
      return {
        ...this.get(),
        // id:undefined,
        text: undefined,
        userId: undefined,
        room: undefined,
        updatedAt:undefined,
        type: undefined,
      }
    }
  }
  Message.init({
    uuid:{
     type:DataTypes.INTEGER,
     defaultValue: 1234
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    text: {
      type: DataTypes.STRING,
    },
    room: {
      type: DataTypes.STRING,
    },
    type:{
      type:DataTypes.STRING,
      allowNull:false
    },
  }, {
    sequelize,
    tableName:"messages",
    modelName: 'Message',
  });
  return Message;
};


