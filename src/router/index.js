import { createRouter, createWebHashHistory } from "vue-router";
import { useLoadingStore } from "@/stores";
import { SysConstants } from "@/helpers";
import homeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, from, savedPosition) {
    // 如果有 position 資訊則自動捲到位置
    if (savedPosition) {
      // 需等待畫面渲染完成，因此使用非同步延遲回傳
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedPosition);
        }, SysConstants.scrollWaitingTime);
      });
    }
  },

  routes: [
    // 首頁
    {
      path: "/",
      name: "home",
      component: homeView,
    },
    // {
    //   path: '/events/:tag(.*)?',
    //   name: 'events',
    //   component: () => import("../views/EventListView.vue"),
    //   props: true,
    // },
    // 活動列表頁
    {
      path: "/events",
      name: "eventList",
      component: () => import("@/views/EventListView.vue"),
    },
    // 活動資訊頁
    {
      path: "/events/:id",
      name: "eventDetail",
      component: () => import("@/views/EventDetailView.vue"),
    },
    // 測試
    {
      path: "/test",
      name: "test",
      component: () => import("@/views/test/TestView.vue"),
      children: [
        {
          path: "bs",
          name: "testBs",
          component: () => import("@/views/test/TestBs.vue"),
        },
        {
          path: "layout",
          name: "testLayout",
          component: () => import("@/views/test/TestLayout.vue"),
        },
        {
          path: "js",
          name: "testJs",
          component: () => import("@/views/test/TestJs.vue"),
        },
      ],
    },
    // 404
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      // redirect: "/", // 導回首頁
      component: () => import("@/views/NotFoundView.vue"), // 使用客製的頁面
    },
  ],
});

// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from) => {
  // 在進入頁面之前將 loading reset，以避免前一頁沒有正常關閉而造成問題
  useLoadingStore().reset();
});

export default router;
