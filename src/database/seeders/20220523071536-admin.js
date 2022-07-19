import bcrypt from "bcryptjs"
import dotenv from "dotenv"

dotenv.config('')

'use strict';
module.exports = {
 up:async (queryInterface, Sequelize)=>{
    return await queryInterface.bulkInsert("users",[
        {
          uuid: "7e72de6a-7d21-493a-b9c2-0bd4c57c0633",
          firstName: "felix Ange",
          lastName: "Izere",
          email: "izerefaifelix@gmail.com",
          password:await bcrypt.hash(process.env.ADDIMIN_PASSWORD,Number(process.env.HASH_PASSWORD_SALT)),
          devType: "senior",
          roleId:10,
          roleName: "admin",
          isActive: true,
          createdAt:new Date(),
          updatedAt:new Date()
      },
      
    ])
  },

  down:async (queryInterface, Sequelize)=>{
    return await queryInterface.bulkDelete("users",null,{})
  }
};
