import express from 'express';
import {
  textToSpeech,
  speechToText
} from '../../controllers/speechAndText';
import { upload } from '../../utils/uploadAudio';

import { protect, restrictRoleTo } from '../../middlewares/middleware';

const router = express.Router();

router
  .post('/textToSpeech', protect, upload.single('file'), restrictRoleTo('admin', 'ent', 'pro','free'), textToSpeech)
  .post('/speechToText', protect, upload.single('file'), restrictRoleTo('admin', 'ent', 'pro'), speechToText)
  
export default router;
