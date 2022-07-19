import express from 'express';

import {
  makePayment,
  onSucess,
  onCancel,
  getPaymentInfo,
  getAllPaymentInfo,
  deletePaymentInfo,
} from './../../controllers/PaymentController';
import { protect, restrictRoleTo} from './../../middlewares/middleware';

const router = express.Router();

router.post('/pay', protect,makePayment);
router.get('/success',onSucess);
router.get('/cancel', protect, onCancel);
router
  .route('/')
  .get(protect, restrictRoleTo('admin'), getAllPaymentInfo);
router
  .route('/:uuid')
  .get(protect, restrictRoleTo('admin'), getPaymentInfo)
  .delete(protect, restrictRoleTo('admin'), deletePaymentInfo);

export default router;
