import express from 'express';
import {
  createRole,
  getAllRoles,
  getRole,
  updateRole,
  deleteRole,
} from './../../controllers/roleController';

import { protect, restrictRoleTo } from './../../middlewares/middleware';

const router = express.Router();

router
  .route('/')
  .post(protect, restrictRoleTo('admin'), createRole)
  .get(protect, restrictRoleTo('admin'), getAllRoles);
router
  .route('/:uuid')
  .get(protect, restrictRoleTo('admin'), getRole)
  .patch(protect, restrictRoleTo('admin'), updateRole)
  .delete(protect, restrictRoleTo('admin'), deleteRole);

export default router;
