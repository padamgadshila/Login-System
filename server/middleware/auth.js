import jwt from "jsonwebtoken";
let Auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const result = jwt.verify(token, process.env.jwt_key);
    req.user = result;
    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({ error: "Authentication failed" });
  }
};

export default Auth;
