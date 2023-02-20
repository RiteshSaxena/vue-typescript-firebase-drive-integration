import express from 'express';
import cors from 'cors';

const app = express();

import authHandler from './middlewares/auth';
import filesRoute from './api/files/route';

app.use(cors());
app.use(express.json());
app.use(authHandler);

app.use('/files', filesRoute);

export default app;
