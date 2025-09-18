import express from "express";
import {
  login,
  logout,
  register,
  generateApiKey,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import passport from "passport";
import { googleLogin } from "../controllers/user.controller.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Step 1: Redirect user to Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleLogin
);


// Protected routes
router.post("/logout", authMiddleware, logout);
router.post("/generate-api-key", authMiddleware, generateApiKey);


export default router;
