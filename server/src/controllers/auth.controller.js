import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";


export const register = asyncHandler(async (req, res) => {

  const {
    name,
    username,
    email,
    password
  } = req.body;


  const existingUser = await User.findOne({
    $or: [
      { username },
      { email }
    ]
  });


  if (existingUser) {

    return res.status(409).json({
      success: false,
      message: "Username or email already exists"
    });

  }


  const user = await User.create({
    name,
    username,
    email,
    password
  });


  const token = generateToken(user._id);


  res.status(201).json({

    success: true,

    message: "Account created successfully",

    data: {

      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email
      },

      token

    }

  });

});



export const login = asyncHandler(async (req, res) => {

  const {
    username,
    password
  } = req.body;


  const user = await User.findOne({
    username
  }).select("+password");


  if (!user) {

    return res.status(401).json({

      success: false,

      message: "Invalid username or password"

    });

  }


  const isPasswordCorrect =
    await user.comparePassword(password);


  if (!isPasswordCorrect) {

    return res.status(401).json({

      success: false,

      message: "Invalid username or password"

    });

  }


  const token = generateToken(user._id);


  res.status(200).json({

    success: true,

    message: "Login successful",

    data: {

      user: {

        id: user._id,

        name: user.name,

        username: user.username,

        email: user.email

      },

      token

    }

  });

});



export const getMe = asyncHandler(async (req, res) => {

  res.status(200).json({

    success: true,

    data: {
      user: req.user
    }

  });

});