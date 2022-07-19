'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.INTEGER,
        defaultValue: 1234,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      room: {
        type: DataTypes.STRING,
      },
      text: {
        type: DataTypes.STRING,
      },
      type:{
        type:DataTypes.STRING,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('messages');
  },
};
