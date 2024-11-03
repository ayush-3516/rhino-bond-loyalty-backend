import express from 'express';
import { register, login, verifyOtp, refreshToken, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/refrest-token', refreshToken);
router.post('/logout', logout);

export default router;
