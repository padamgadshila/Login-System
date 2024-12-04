import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide unique username"],
    unique: [true, "Username Exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  address: { type: String },
  profile: { type: String },
});

export default mongoose.model.Users || mongoose.model("User", UserSchema);
