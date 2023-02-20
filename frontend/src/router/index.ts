import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import store from '@/store';

import Login from '@/views/Login.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import Dashboard from '@/views/Dashboard.vue';
import ApplicationUrl from '@/views/ApplicationUrl.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      guest: true,
    },
  },
  {
    path: '/applications',
    name: 'Applications',
    component: Dashboard,
    meta: {
      auth: true,
    },
  },
  {
    path: '/application/:userId',
    name: 'ApplicationUrl',
    component: ApplicationUrl,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const currentUser = await store.dispatch('user/getUser');

  if (to.matched.some((record) => record.meta.auth)) {
    if (!currentUser) {
      next({
        name: 'Login',
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (currentUser) {
      next({
        name: 'Dashboard',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
