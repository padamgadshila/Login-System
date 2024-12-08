import { Router } from "express";
import * as controllers from "../controllers/appControllers.js";
import Auth from "../middleware/auth.js";
const router = Router();

// post
router.route("/register").post(controllers.register);
router.route("/registerMail").post();
router.route("/authenticate").post();
router.route("/login").post(controllers.login);
// get
router.route("/user/:username").get(controllers.getUser);
router.route("/generateOTP").get();
router.route("/verifyOTP").get();
router.route("/createResetSession").get();

// put
router.route("/updateUser").put(Auth, controllers.updateUser);
router.route("/resetPassword").put();

export default router;
