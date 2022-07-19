import dotenv from 'dotenv';
import model from '../database/models';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import {Op} from "sequelize"

/**
 * Get the Models
 */
const User = model.User;
const Role = model.Role

dotenv.config();


export  const getAllUsers = catchAsync(async(req, res,next) => {

/**
 * Fetch all Active users 
 */

  const allUsers = await User.findAll({where:{
    isActive:{
      [Op.eq]:true
    }
  }})

  
/**
 * Send Back users
 */

  res.status(200).json({
    status:"success",
    result:allUsers.length,
    data:{
      users:allUsers
    }
  })
})


export const getUser = catchAsync(async(req,res,next)=>{

  /**
   * Get user id(uuid)
   */

  const uuid = req.params.uuid

   /**
   * Find user by id(uuid)
   */

  const user = await User.findOne({where:{uuid}})
  
   /**
   * provide a generic message if no user found with that ID
   */

  if(!user){
    return next(new AppError("No User found with that ID",404))
  }
  

   /**
   * Send Back User
   */

  res.status(200).json({
    status:"success",
    data:{
      user
    }
  })
})


export const deActivateUser = catchAsync(async(req,res,next)=>{

  /**
   * Deactivating User instead of deleting
   */

  const uuid = req.params.uuid
  
  const user = await User.findOne({where:{uuid}})

  if(!user){
   return next(new AppError("No user found with that ID",400))
  }
  
   /**
   * Deactivating the user 
   */

  await User.update({isActive:false},{where:{uuid}})
  
  
  res.status(200).json({
   status:"success",
   message:"User deleted Successfully!!"
  })

})



export const deleteUser = catchAsync(async(req, res,next)=>{

  /**
   * Delete user based on id(uuid)
   */

  const uuid = req.params.uuid

  
  /**
   * Check if the user is there
   */

  const user = await User.findOne({where:{uuid}})
  
  /**
   * Send back a generic message if no user found with that ID
   */

  if(!user){
   return next(new AppError("No user found with that ID",400))
  }

  /**
   * Delete user based on id(uuid)
   */

  await User.destroy({where:{uuid}})
 
  
 
  res.status(200).json({
    status:"success",
    message:"User deleted Successfully",
  })

})


export const updateProfile = catchAsync(async(req, res,next)=>{
  
/**
 * Get user id(uuid) and Information to be updated 
 */

  const {firstName,lastName,devType} = req.body
 
  const uuid = req.params.uuid
 
 /**
  * Find user by id
  */
  const user =  await User.findOne({where:{uuid}})

/**
 * Send a generic message if no user found
 */

  if(!user){
    return next(new AppError("No User found with that ID",404))
  }
  
  /**
   * if user wis there then we can update his information
   */

  await User.update({
    firstName,
    lastName,
    devType,
    profilePic:req.file.path
  },{
    where:{uuid}
  })

res.status(200).json({
  status:"success",
  message:"User profile Updated Successfully!!"
})
})


export const assignRoleTouser = catchAsync(async (req, res, next) => {

  /**
   * Get user id(uuid) and roleId 
   */

  const {userId,roleId} =req.params

  /**
   * check if usr is there
   */

  const user = await User.findOne({where:{uuid:userId}})

  /**
   * send back a generic message if no user found
   */

if(!user){
  return next(new AppError("No user found with that ID",400))
}

 /**
   * check if usr is there
   */

const role =  await Role.findOne({where:{uuid:roleId}})

/**
 * Send error message if no role found
 */

if(!role){
  return next(new AppError("No role found with that ID",404))
}

/**
 * Assign a new role to the user
 */

await User.update({
  roleName:role.roleName,
  roleId:role.id
},
{
  where:{uuid:userId}
})

res.status(200).json({
  status:"succes",
  message:`${user.firstName} is now assigned to ${role.roleName} Role`
})

})