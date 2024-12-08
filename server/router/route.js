import { Router } from "express";
import * as controllers from "../controllers/appControllers.js";
import { Auth, localVariables } from "../middleware/auth.js";
import { registerMail } from "../controllers/sendMail.js";
const router = Router();

// post
router.route("/register").post(controllers.register);
router.route("/registerMail").post(registerMail);
router.route("/authenticate").post();
router.route("/login").post(controllers.login);
// get
router.route("/user/:username").get(controllers.getUser);
router
  .route("/generateOTP")
  .get(controllers.verifyUser, localVariables, controllers.generateOTP);
router.route("/verifyOTP").get(controllers.verifyUser, controllers.verifyOTP);
router.route("/createResetSession").get();

// put
router.route("/updateUser").put(Auth, controllers.updateUser);
router
  .route("/resetPassword")
  .put(controllers.verifyUser, controllers.resetPassword);

export default router;
