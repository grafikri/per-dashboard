import Vue from 'vue';
import VueRouter from 'vue-router';
import MainLayout from '@/components/MainLayout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: () => import('@/views/Home.vue'),
      layout: MainLayout,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
