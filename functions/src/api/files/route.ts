import express from 'express';
import {authUrl, authToken, getFiles} from './controller';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', getFiles);

router.post('/connect', authUrl);

router.post('/connect/token', authToken);

export default router;
