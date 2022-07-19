'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate({User}) {
      this.belongsTo(User,{foreignKey:"userId",as:"user"})
     
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        // userId: undefined,
        createdAt:undefined,
        updatedAt:undefined
      };
    }
  }
  Payment.init(
    {
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
    },
    {
      sequelize,
      tableName: 'payments',
      modelName: 'Payment',
    }
  );
  return Payment;
};
