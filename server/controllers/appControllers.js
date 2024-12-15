import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { secret } from "../env.js";
// Verify

export const verifyUser = async (req, res, next) => {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;
    let exists = await userModel.findOne({ username });
    if (!exists) {
      return res.status(404).json({ error: "Can't find the user!" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: "Authentication Error" });
  }
};

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
        return res.status(409).send({ error: "username already taken" });
      }
      if (existingUser.email === email) {
        return res.status(409).send({ error: "email already taken" });
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
    return res.status(201).send({ message: "Registered successfully" });
  } catch (error) {
    console.error(error);

    return res.status(500).send({ error: "Internal server error" });
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
    const token = Jwt.sign(
      {
        userId: checkUserExist.id,
        username: checkUserExist.username,
      },
      secret.jwt_key,
      { expiresIn: "1h" }
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
  const { username } = req.params;
  try {
    if (!username) {
      return res.status(501).json({ error: "Invalid user" });
    }

    let user = await userModel.findOne({ username }).select("-password");

    if (!user) return res.status(501).json({ error: "user not found" });
    return res.status(201).send(user);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ error: "Cannot find the user data" });
  }
}

export async function updateUser(req, res) {
  try {
    const { userId } = req.user;
    if (!userId) return res.status(404).json({ error: "user not found" });
    const body = req.body;
    let users = await userModel.updateOne({ _id: userId }, body);

    return res.status(201).json({ message: "user updated", users });
  } catch (error) {
    console.error(error);
    return res.status(404).send({ error });
  }
}

export async function generateOTP(req, res) {
  req.app.locals.OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  res.status(201).send({ code: req.app.locals.OTP });
}

export async function verifyOTP(req, res) {
  const { code } = req.query;
  if (parseInt(req.app.locals.OTP) === parseInt(code)) {
    req.app.locals.OTP = null;
    req.app.locals.resetSession = true;
    return res.status(201).send({ message: "Verify success" });
  }
  return res.status(400).send({ error: "invalid otp" });
}

export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    req.app.locals.resetSession = false;
    return res.status(201).json({ message: "access granted" });
  }
  return res.status(440).send({ error: "session expired" });
}

export async function resetPassword(req, res) {
  const { username, password } = req.body;

  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "session expired" });

    const user = await userModel.findOne({ username });

    if (!user) return res.status(404).send({ error: "user not found" });
    const hashedPassword = await bcrypt.hash(password, 10);

    let result = await userModel.updateOne(
      { username: user.username },
      {
        password: hashedPassword,
      }
    );
    req.app.locals.resetSession = false;
    return res.status(201).send({ message: "password reset done" });
  } catch (error) {
    console.error(error);
    return res.status(401).send(error);
  }
}
