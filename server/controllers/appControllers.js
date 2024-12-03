import userModel from "../model/userModel.js";

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
 * }
 */
export async function register(req, res) {
  try {
    const { username, password, email, profile } = req.body;

    const ifUserExists = await userModel.findOne({ username });

    if (ifUserExists) {
      return res.status(401).json({ error: "username already taken" });
    }

    const ifUserEmailExists = await userModel.findOne({ email });

    if (ifUserEmailExists) {
      return res.status(401).json({ error: "email already taken" });
    }

    console.log(username, password, email, profile);
  } catch (error) {
    return res.status(500).send(error);
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
  res.json("login route");
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
