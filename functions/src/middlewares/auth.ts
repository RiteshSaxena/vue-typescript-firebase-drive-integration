import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import {Request, Response, NextFunction} from 'express';

const authHandler = async (req: Request, res: Response, next: NextFunction) => {
  functions.logger.log('Check if request is authorized with Firebase ID token');

  let idToken;
  if (req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')) {
    functions.logger.log('Found "Authorization" header');
    idToken = req.headers.authorization.split(' ')[1];
  } else {
    res.status(403).send({
      message: 'Unauthorized',
    });
    return;
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    functions.logger.log('ID Token correctly decoded', decodedIdToken);
    (req as any).user = decodedIdToken;
    next();
    return;
  } catch (error) {
    functions.logger.error('Error while verifying Firebase ID token:', error);
    res.status(403).send({
      message: 'Unauthorized',
    });
    return;
  }
};

export default authHandler;
