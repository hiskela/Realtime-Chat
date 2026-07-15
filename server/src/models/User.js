import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50
    },

    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 20
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false
    },

    avatar: {
      type: String,
      default: ""
    },

    bio: {
      type: String,
      default: "",
      maxlength: 150
    },

    isOnline: {
      type: Boolean,
      default: false
    },

    lastSeen: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);


userSchema.pre("save", async function(){

  if(!this.isModified("password")){
    return;
  }


  const salt = await bcrypt.genSalt(12);


  this.password = await bcrypt.hash(
    this.password,
    salt
  );

});


userSchema.methods.comparePassword = async function(password){

  return await bcrypt.compare(
    password,
    this.password
  );

};


export default mongoose.model(
  "User",
  userSchema
);