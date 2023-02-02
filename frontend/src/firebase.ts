import { initializeApp } from 'firebase/app';

export default function firebase() {
  const firebaseConfig = {
    apiKey: 'AIzaSyCNFf8mLKF1ZKprWXwZQC29dudZqEIgruY',
    authDomain: 'ritesh-saxena-test.firebaseapp.com',
    projectId: 'ritesh-saxena-test',
    storageBucket: 'ritesh-saxena-test.appspot.com',
    messagingSenderId: '526272715214',
    appId: '1:526272715214:web:59406ca7638f03074e339f',
  };

  return initializeApp(firebaseConfig);
}
