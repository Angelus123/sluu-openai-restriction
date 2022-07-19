import dotenv from 'dotenv';
import model from '../database/models';
import fs from 'fs';
import AppError from '../utils/appError';
import TextToSpeech from '@google-cloud/text-to-speech';
import Speech from '@google-cloud/speech';
import util from 'util';
import catchAsync from '../utils/catchAsync'; 
import {Op} from "sequelize"

/**
 * Get the Models
 */
const User = model.User;
const Role = model.Role
require('dotenv').config();
// dotenv.config();
const tts_client = new TextToSpeech.TextToSpeechClient();
const stt_client = new Speech.SpeechClient();



/**
 * 1) Speech to text
 */
 async function spchToText(audio) {
  const request = {
    audio: {content:audio},
    config: {encoding:"MP3",sampleRateHertz: 16000,languageCode: 'en-US'}
  };  
  const [response] = await stt_client.recognize(request);
  return response;
}  
export const speechToText = catchAsync(async(req,res,next)=>{
const filename =req.file.path 
console.log("FileName:", filename)

const file = fs.readFileSync(filename);
var audioBytes = file.toString('base64');
audioBytes = audioBytes.substring(0, audioBytes.length/2);
const text = await spchToText(audioBytes);    

res.send(text).end();

})


/**
 * 2) Text to Speech
 */
async function txtToSpeech(text) {
  const request = {
    input: {text: text},
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    audioConfig: {audioEncoding: 'MP3'},
  };

  const [response] = await tts_client.synthesizeSpeech(request);
  return response;
}
 export const textToSpeech = catchAsync(async(req,res,next)=>{
  const text = req.body.text;
    const audio = await txtToSpeech(text);    
    res.send(audio).end();
})
 