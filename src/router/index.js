import { createRouter, createWebHashHistory } from "vue-router";
import homeView from "../views/HomeView.vue";
import { SysConstants } from "@/utils";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, from, savedPosition) {
    // TODO DELETE
    console.log(`[Router] to ==>`, to);
    console.log(`[Router] from ==>`, from);
    console.log(`[Router] savedPosition ==>`, savedPosition);
    console.log(`[savedPosition] top ==>`, savedPosition?.top);

    // 如果有 position 資訊則自動捲到位置
    if (savedPosition) {
      // 需等待畫面渲染完成，因此使用非同步延遲回傳
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`============== 執行 scroll 動作 ==============`);
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
      path: "/event/:id",
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
      redirect: "/",
    },
  ],
});

export default router;
