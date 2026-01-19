import express from 'express';
import { loginUser, registerUser, setAvatar } from '../controllers/user.controller.js';

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/setAvatar/:id").post(setAvatar);

export default router;