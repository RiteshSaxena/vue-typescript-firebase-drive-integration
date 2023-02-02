import * as functions from 'firebase-functions';
import {initializeApp} from 'firebase-admin/app';
import express from 'express';
import cors from 'cors';

initializeApp();
const app = express();

import authHandler from './middlewares/auth';
import filesRoute from './api/files/route';

app.use(cors());
app.use(express.json());
app.use(authHandler);

app.use('/files', filesRoute);

export const api = functions.https.onRequest(app);
