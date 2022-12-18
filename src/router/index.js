import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import UserManualView from '@/views/UserManualView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HOME',
    component: HomeView
  },
  {
    path: '/user-manual',
    name: 'USER_MANUAL',
    component: UserManualView
  },
  {
    path: '*',
    redirect: {
      name: 'home'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
