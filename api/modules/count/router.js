import { Router } from 'express';
import { CountController } from './Controller.js';

const router = new Router();
const controller = new CountController();

router.get('/api/events', (...args) => controller.count(...args));

export default router;
