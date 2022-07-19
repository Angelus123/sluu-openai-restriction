import express from 'express';
import {
  qAndA,
  sqlTranslate,
  sqlRequest,
  parseUnstructuredData,
  pythonToNaturalLanguage,
  calculateTimeComplexity,
  programmingLanguageConverter,
  explainCode,
  pythonBugFixer,
  javascriptHelperChatbox,
  writePythonDocstring,
  javascriptOneLineFunction,
  completions,
  textToCommands,
  MlAiLanguageTutor,
  javascriptToPython
} from './../../controllers/codexOpenai';

import { protect, restrictRoleTo } from './../../middlewares/middleware';

const router = express.Router();

router
  .post('/qAndA', protect, restrictRoleTo('admin', 'ent', 'pro','free'), qAndA)
  .post('/sqlTranslate', protect, restrictRoleTo('admin', 'ent', 'pro'), sqlTranslate)
  .post('/sqlRequest', protect, restrictRoleTo('admin', 'ent', 'pro'), sqlRequest)
  .post('/parseUnstructuredData', protect, restrictRoleTo('admin', 'ent', 'pro'), parseUnstructuredData)
  .post('/pythonToNaturalLanguage', protect, restrictRoleTo('admin', 'ent', 'pro'),  pythonToNaturalLanguage)
  .post('/javascriptHelperChatbox', protect, restrictRoleTo('admin', 'ent', 'pro'), javascriptHelperChatbox)
  .post('/calculateTimeComplexity', protect, restrictRoleTo('admin', 'ent', 'pro'),  calculateTimeComplexity)
  .post('/programmingLanguageConverter', protect, restrictRoleTo('admin', 'ent', 'pro'), programmingLanguageConverter)
  .post('/explainCode', protect, restrictRoleTo('admin', 'ent', 'pro'), explainCode)
  .post('/pythonBugFixer', protect, restrictRoleTo('admin', 'ent', 'pro'), pythonBugFixer)
  .post('/writePythonDocstring', protect, restrictRoleTo('admin', 'ent', 'pro'), writePythonDocstring)
  .post('/javascriptOneLineFunction', protect, restrictRoleTo('admin', 'ent', 'pro'), javascriptOneLineFunction)
  .post('/completions', protect, restrictRoleTo('admin', 'ent', 'pro'), completions)
  .post('/textToCommands', protect, restrictRoleTo('admin', 'ent', 'pro'), textToCommands)
  .post('/MlAiLanguageTutor', protect, restrictRoleTo('admin', 'ent', 'pro'), MlAiLanguageTutor)
  .post('/javascriptToPython', protect, restrictRoleTo('admin', 'ent', 'pro'), javascriptToPython)
export default router;
