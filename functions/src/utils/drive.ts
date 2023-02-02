import {google, Auth} from 'googleapis';
import * as console from 'console';

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import credentials from '../../keys/credentials.json';
const oauth2Client = new google.auth.OAuth2(
    credentials.web.client_id,
    credentials.web.client_secret,
    'https://ritesh-saxena-test.web.app/dashboard'
);
/**
 * Reads previously authorized credentials from the save file.
 *
 * @param {any} tokens
 * @return {Promise<OAuth2Client|null>}
 */
export async function loadCredentials(tokens: any)
  : Promise<Auth.OAuth2Client|null> {
  try {
    const token = {
      type: 'authorized_user',
      client_id: credentials.web.client_id,
      client_secret: credentials.web.client_secret,
      refresh_token: tokens.refresh_token,
    };
    return google.auth.fromJSON(token) as Auth.OAuth2Client;
  } catch (err) {
    return null;
  }
}

/**
 * Generate authorization url
 *
 */
export async function getAuthorizationUrl() {
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    include_granted_scopes: true,
  });

  return authorizationUrl;
}

/**
 * Validate response token and generate access token
 *
 * @param {string} token
 */
export async function getAccessToken(token: string) {
  const {tokens} = await oauth2Client.getToken(token);

  return tokens;
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
export async function listFiles(authClient: Auth.OAuth2Client) {
  const drive = google.drive({version: 'v3', auth: authClient});
  const res = await drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name, modifiedTime)',
    orderBy: 'modifiedTime desc',
  });
  const files = res.data.files;
  if (!files || files.length === 0) {
    console.log('No files found.');
    return [];
  }

  return files;
}
