import express from 'express';
import { getSupportTickets, createSupportTicket } from '../controllers/support.controller.js';

const router = express.Router();

router.get('/', getSupportTickets);
router.post('/', createSupportTicket);

export default router;
