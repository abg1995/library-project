const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true , "email is required"],
      lowercase: true,
      trim:true,
      required: true//-> Ideally, should be unique, but its up to you
    },
    passwordHash: String,
    type:String,
    required: [true, "password is required"]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
