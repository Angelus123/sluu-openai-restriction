import express from 'express';
import userRoutes from './userRoutes/userRoutes';
import speechAndTextRoutes from './speechAndText/speechAndText';
import codexOpenaiRoutes from './codexOpenai/codexOpenai';
import roleRoutes from "./roleRoutes/roleRoutes"
import paymentRoutes from "./paymentRoutes/paymentRoutes"

const routes = express.Router();
routes.use('/speechAndText', speechAndTextRoutes);
routes.use('/codexOpenai', codexOpenaiRoutes);
routes.use('/users', userRoutes);
routes.use('/roles', roleRoutes);
routes.use('/payments',paymentRoutes);


export default routes;
