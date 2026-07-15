import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";


export const getUsers = asyncHandler(async (req, res) => {

  const users = await User.find({
    _id: {
      $ne: req.user._id
    }
  })
  .select(
    "name username avatar status lastSeen"
  );


  res.status(200).json({

    success:true,

    data:{
      users
    }

  });

});