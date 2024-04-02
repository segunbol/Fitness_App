import express from "express";
import { authenticate } from "../middlewares/authentication";
import { GymSignUp, gymSignIn, gymSignOut } from "../controllers/gymAuth";

const router = express.Router();

router.post("/gymsignup", GymSignUp);
router.post("/gymsignin", gymSignIn);
router.get("/gymsignout", authenticate, gymSignOut);

export default router;