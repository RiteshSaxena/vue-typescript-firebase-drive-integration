import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from './firebase';

import 'bootstrap';

// Global Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/css/index.scss';

const app = createApp(App);

app.use(store);

app.use(router);

app.config.globalProperties.$firebase = firebase();

app.mount('#app');
