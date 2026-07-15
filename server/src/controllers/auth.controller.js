import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";


const cookieOptions = {
  httpOnly:true,
  secure:false,
  sameSite:"lax",
  maxAge:7 * 24 * 60 * 60 * 1000
};



export const register = asyncHandler(
async(req,res)=>{


  const {
    name,
    username,
    email,
    password
  } = req.body;



  const existingUser = await User.findOne({

    $or:[
      {
        username
      },
      {
        email
      }
    ]

  });



  if(existingUser){

    throw new AppError(
      "Username or email already exists",
      409
    );

  }



  const user = await User.create({

    name,
    username,
    email,
    password

  });



  const token = generateToken(
    user._id
  );


  res.cookie(
    "token",
    token,
    cookieOptions
  );



  res.status(201).json({

    success:true,

    message:"Account created successfully",

    data:{

      user:{

        id:user._id,

        name:user.name,

        username:user.username,

        email:user.email

      }

    }

  });


});





export const login = asyncHandler(
async(req,res)=>{


  const {
    username,
    password
  } = req.body;



  const user = await User.findOne({
    username
  })
  .select("+password");



  if(!user){

    throw new AppError(
      "Invalid username or password",
      401
    );

  }



  const passwordMatch =
    await user.comparePassword(
      password
    );



  if(!passwordMatch){

    throw new AppError(
      "Invalid username or password",
      401
    );

  }



  const token = generateToken(
    user._id
  );



  res.cookie(
    "token",
    token,
    cookieOptions
  );



  res.status(200).json({

    success:true,

    message:"Login successful",

    data:{

      user:{

        id:user._id,

        name:user.name,

        username:user.username,

        email:user.email

      }

    }

  });


});





export const logout = asyncHandler(
async(req,res)=>{


  res.clearCookie(
    "token"
  );


  res.status(200).json({

    success:true,

    message:"Logged out successfully"

  });


});





export const getMe = asyncHandler(
async(req,res)=>{


  res.status(200).json({

    success:true,

    data:{
      user:req.user
    }

  });


});