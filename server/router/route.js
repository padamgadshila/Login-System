import { Router } from "express";
import * as controllers from "../controllers/appControllers.js";

const router = Router();

// post
router.route("/register").post(controllers.register);
router.route("/registerMail").post();
router.route("/authenticate").post();
router.route("/login").post(controllers.login);
// get
router.route("/user/:username").get();
router.route("/generateOTP").get();
router.route("/verifyOTP").get();
router.route("/createResetSession").get();

// put
router.route("/updateUser").put();
router.route("/resetPassword").put();

export default router;
