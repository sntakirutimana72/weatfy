import express from 'express';
import Dashboard from '../handlers/dashboard';

const router = express.Router();

router.get('/', Dashboard.home);

export default router;
