import express from 'express';
import {
  signup,
  singIn,
  forgotPassword,
  resetPassword,
  changePassword,
} from './../../controllers/authController.js';
import {
  getAllUsers,
  getUser,
  deleteUser,
  deActivateUser,
  updateProfile,
  assignRoleTouser,
} from './../../controllers/usersController.js';
import { upload } from '../../utils/uploadImage';
import { protect, restrictRoleTo } from './../../middlewares/middleware';

const router = express.Router();

router
  .post('/signup', signup)
  .post('/signin', singIn)
  .post('/forgotPassword', forgotPassword)
  .put('/resetPassword/:token', resetPassword)
  .patch('/changePassword', changePassword)
  .patch('/updateProfile/:uuid', upload.single('file'), updateProfile)
  .patch(
    '/:userId/roles/:roleId',
    protect,
    restrictRoleTo('admin'),
    assignRoleTouser
  );

router.route('/').get(protect, restrictRoleTo('admin'), getAllUsers);
router
  .route('/:uuid')
  .get(protect, restrictRoleTo('admin'), getUser)
  .put(protect, restrictRoleTo('admin'), deActivateUser)
  .delete(protect, restrictRoleTo('admin'), deleteUser);

export default router;
