import { Router } from 'express';
import {
  getUsers,
  getUserRequests
} from '../controllers/userController.js';

const router = Router();

router.get('/', getUsers);
router.get('/:id/requests', getUserRequests);

export default router;