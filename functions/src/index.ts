import * as functions from 'firebase-functions';
import {initializeApp} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
import {getAuth} from 'firebase-admin/auth';

initializeApp();

import app from './app';
import * as console from 'console';

export const api = functions.https.onRequest(app);

const db = getFirestore();

export const sendNotification = functions.https.onCall(
    async (data, context) => {
      if (!(data && data.referenceId && data.userId && data.url)) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'Reference Id and User Id is required'
        );
      }

      let user;
      try {
        user = await getAuth().getUser(data.userId);
      } catch (err) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'Invalid User Id'
        );
      }

      console.log(user);

      const docRef = db.collection('references').doc(data.referenceId);

      const doc = await docRef.get();

      if (!doc.exists) {
        throw new functions.https.HttpsError(
            'invalid-argument',
            'Invalid reference id'
        );
      }

      console.log(context.rawRequest.headers);
      const userAgent = context.rawRequest.headers['user-agent'];
      const country = context.rawRequest.headers['x-appengine-country'];
      const city = context.rawRequest.headers['x-appengine-city'];

      const docData = doc.data();

      const date = new Date();

      const timestamp = date.toLocaleString('en-US', {
        timeZone: 'America/New_York',
      }).split(',');

      console.log('agentEmail', user.email);
      console.log('subject', `App link for ${docData?.name} has been opened.`);
      console.log('body', `
          Your App sent to ${docData?.name} was viewed at ${timestamp[1]} time
          and Date ${timestamp[0]} and on ${userAgent} device and location
          ${city} (${country}).
          
          ${data.url}
          
          Regards,
          AFN`
      );

      return {
        success: true,
      };
    },
  {

  }
    );
