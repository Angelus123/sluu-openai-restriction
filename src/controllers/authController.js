import model from '../database/models';
import bcrypt from "bcryptjs"
import catchAsync from "../utils/catchAsync"
import AppError from '../utils/appError'
import jwt from "jsonwebtoken"
import sgMail from "@sendgrid/mail";
import crypto from 'crypto'
import config from '../config/config';

/**
 * Get Password HASH SALT NUMBER from env variables
 */
const currentConfig = config[process.env.NODE_ENV];
const { hashPassNum }= currentConfig;

/**
 * Get user model
 */

 const User = model.User;

 /**
  * Generate Token
  */

const signToken =(uuid)=>{
  return jwt.sign({uuid},process.env.JWT_SECRETE,{
    expiresIn:process.env.JWT_EXPIRES_IN
  })
}


export const signup = async(req,res,next)=>{
  
  try {
    /**
     * Get user information
     */

    const {firstName,lastName,email,password,devType} = req.body
   
    /**
     * Checking for invalid information
     */

    if(!firstName||!lastName||!email||!password||!devType){
      return res.status(400).json({
        status:"fail",
        message:"Invalid request, Provide valid information"
      })
    }
   
    /**
     * Check if user is not existing
     */
    const user = await User.findOne({where:{email}})

    if(user){
    return res.status(403).json({
      status:"fail",
      message:"User already exist"
    })
    }

    /**
     * Registering a new user
     */

    const newUser = await User.create({
      firstName,
      lastName,
      devType,
      email,
      password:await bcrypt.hash(password,12),
    })

    res.status(201).json({
      status:"success",
      data:{
        users:newUser
      }
    })

  } catch (error) {
    res.status(500).json({
      status:"fail",
      message:"Error while creating a user",
      err:error.message,
    })
   
  }
}




export const singIn = async(req,res,next)=>{

  try{

  /**
   * Get user email and password
   */
    const {email,password} = req.body

/**
 * Check if email or password are not empty
 */
    if(!email||!password){
      return res.status(400).json({
        status:"fail",
        message:"Invalid data supplied"
      })
    }
    
   /**
    * find user by email
    */
    const user = await User.findOne({where:{email}})

   /**
    * Send error message if no user or entered password is not matching 
    */
    if(!user||!( await bcrypt.compare(password,user.password))){
      return res.status(403).json({
        status:"fail",
        message:"Invalid email or password"
      })
    }

   /**
    * Generate a token
    */
    const Token = signToken(user.uuid)
    
    /**
     * Send back user along wwith a token
     */

    res.status(200).json({
      status:"success",
      message:"Loggged In successfully!!",
      token:Token,
      data:{
        user
      }
    })


  }catch(error){
    res.status(403).json({
      status:"fail",
      message:"Error while sing in user",
      err:error.message
    })
   
  }

}

 /**
  * Generating reset Password token 
  */

 const createPasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  let passwordResetToken = crypto
  .createHash('sha256')
  .update(resetToken)
  .digest('hex')
  let passwordResetExpires = Date.now()+10*60*1000
  
  return resetToken
 }
 
export const forgotPassword =  catchAsync(async (req, res, next ) => {
  
 /**
  * Get user email and find user by that email
  */
  const {email} = req.body

  const user = await User.findOne({where:{email}})

 /**
  * Send error message if no user found
  */

  if(!user){
      return next(new AppError("There is no user with that email address", 403))
  }

 /**
  * Generate a token and update user passwordResetToken token field
  */
  const resetToken = createPasswordResetToken()
  
  await User.update({
    passwordResetToken:resetToken
  },
  {
    where:{email}
  })

  /**
   * Send token to user email
   */

   const currentConfig = config[process.env.NODE_ENV];
   const { sendgridAPIKey, senderEmail } = currentConfig;

  const resetURL =`${req.protocol}://${req.get(
      'host'
      )}/api/v1/users/resetPassword/${resetToken}`
      const message =`Forgot your password? Submit a PATCH with your new password and passwordConfirm to:${resetURL}.\n
       If you didn't forget your password, please ignore this email.`
    
      sgMail.setApiKey(sendgridAPIKey);
      const msg = {
          to: `${email}`,
          from: `${senderEmail}`,
          subject: "Test Subject",
          text: 'Hello World!',
          html: `<strong>${resetURL}</strong>`,
      };

      sgMail.send(msg, function(err, info) {
          if (err) {
            return next(new AppError('There was an error sending the email. Try again later!', 500)) 
          } else {
            res.status(200).json({
                      status:'success',
                      message:'token sent to email'
                  })
          }
      });
  })

  export const resetPassword = catchAsync(async(req, res, next)=>{
  
    /**
     * Get new password and token 
     */
    const {password} = req.body
    const Token  = req.params.token

    if(!password||!Token){
      return next(new AppError("Invalid password or reset token",400))
    }
   
    
    /**
     * Find user by token
     */

    const user = await User.findOne({
      where:{passwordResetToken:Token}
    })
   
    if(!user){
      return next(new AppError("User belongs to this token does not exist",401))
    }
    
   /**
    * Hash new Password
    */
    const hashedPassword = await bcrypt.hash(password,hashPassNum)

    user.password = hashedPassword
    user.passwordResetToken =""
    user.save()
   
    await User.update({
      password:hashedPassword,
      passwordResetToken:""
    },
    {
      where:{passwordResetToken:Token}
    })
    
    res.status(200).json({
    status: 'success',
    message: 'Password updated successfully!!!'
    })

    })


export const changePassword = catchAsync(async(req,res, next)=>{

  const {newPassword,oldPassword}  = req.body

  let token 

  if(req.headers.authorization.startsWith("Bearer")){
   token = req.headers.authorization.split(" ")[1]
  }
  
  if(!token){
    return next(new AppError("Loggin first",401))
  }



  const decoded = jwt.verify(token,process.env.JWT_SECRETE);


  const uuid = decoded.uuid
  const user = await User.findOne({
    where:{uuid}
  })

  if(!user){
   return next(new AppError("The user belongs to this token does not exist",401))
  }


  const correctPassword = await bcrypt.compare(oldPassword,user.password)


  if(!correctPassword){
    return next(new AppError("The old password is wrong correct it and try again",400))
  }

  const hashedPassword = await bcrypt.hash(newPassword,12)


  user.password = hashedPassword
  user.save()

  res.status(200).json({
  status:"success",
  message:"Password updated successfully !!"
  })

})

