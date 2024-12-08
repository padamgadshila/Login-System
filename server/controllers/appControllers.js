import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
const KEY = "ThisIsMySecretKeyWhichYouCanNeverGuess";
/**
 *  POST : http://localhost:8000/api/register
    @param :{
    "username" :"padam",
    "password":"asdfgh@rd",
    "email":"paddygodz@gmail.com"
    "fname":"padam",
    "lname":"gadshila",
    "mobile":4587412564,
    "address":"pune",
    "profile":""
  }
 */
export async function register(req, res) {
  try {
    const { username, password, email, profile } = req.body;

    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(409).json({ error: "username already taken" });
      }
      if (existingUser.email === email) {
        return res.status(409).json({ error: "email already taken" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      username,
      password: hashedPassword,
      email,
      profile,
    });

    const savedUser = await user.save();
    console.log(savedUser);
    return res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Internal server error" });
  }
}

/**
 *  POST : http://localhost:8000/api/login
    @param :{
    "username" :"padam",
    "password":"asdfgh@rd",
 * }
 */
export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const checkUserExist = await userModel.findOne({
      $or: [{ username: username }, { email: username }],
    });

    if (!checkUserExist) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      checkUserExist.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    const token = await Jwt.sign(
      {
        userId: checkUserExist.id,
        username: checkUserExist.username,
      },
      KEY,
      { expiresIn: "24h" }
    );
    return res.status(200).json({
      message: "user logged in successfully",
      username: checkUserExist.username,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/**
 *  POST : http://localhost:8000/api/getUser
 */
export async function getUser(req, res) {
  res.json("get user");
}

export async function updateUser(req, res) {
  res.json("update user");
}

export async function generateOTP(req, res) {
  res.json("generate otp");
}

export async function verifyOTP(req, res) {
  res.json("verify otp");
}

export async function createResetSession(req, res) {
  res.json("reset session");
}

export async function resetPassword(req, res) {
  res.json("reset password");
}
