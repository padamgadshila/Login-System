import jwt from "jsonwebtoken";
import { secret } from "../env.js";
export const Auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const result = jwt.verify(token, secret.jwt_key);
    req.user = result;
    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({ error: "Authentication failed" });
  }
};

export const localVariables = async (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};
