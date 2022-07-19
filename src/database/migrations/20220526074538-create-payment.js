'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      paymentId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payerStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payerEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payerFirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payerLastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payerId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payeeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payeeEmail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payeeMerchantId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalAmount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('payments');
  }
};