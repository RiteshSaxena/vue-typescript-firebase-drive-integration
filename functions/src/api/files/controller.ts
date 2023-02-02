import {Request, Response} from 'express';
import {getFirestore} from 'firebase-admin/firestore';
import {
  getAccessToken, getAuthorizationUrl, listFiles, loadCredentials,
} from '../../utils/drive';

const db = getFirestore();

export const getFiles = async (req: Request, res: Response) => {
  try {
    const userData = await db.collection('users')
        .doc((req as any).user.uid).get();

    let isConnected = false;
    let files: any[] = [];
    const data = userData.data();

    console.log(data);
    if (userData.exists && data && data.tokens) {
      isConnected = true;
      const authClient = await loadCredentials(data.tokens);
      if (authClient) {
        files = await listFiles(authClient);
      }
    }

    res.send({
      isConnected,
      files,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};

export const authUrl = async (req: Request, res: Response) => {
  try {
    const authorizationUrl = await getAuthorizationUrl();
    res.send({
      authorizationUrl,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};

export const authToken = async (req: Request, res: Response) => {
  try {
    if (!req.body.token) {
      throw new Error('Authentication token is missing');
    }
    const tokens = await getAccessToken(req.body.token);

    const data = {
      tokens,
    };

    await db.collection('users')
        .doc((req as any).user.uid).set(data);

    res.send({
      success: true,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};
