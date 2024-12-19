import { createRouter, createWebHashHistory } from 'vue-router';
import homeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeView,
    },
    // 測試
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/test/TestView.vue'),
      children: [
        {
          path: 'bs',
          name: 'testBs',
          component: () => import('../views/test/TestBs.vue'),
        },
        {
          path: 'layout',
          name: 'testLayout',
          component: () => import('../views/test/TestLayout.vue'),
        },
      ],
    },
  ],
});

export default router;
