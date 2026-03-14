import { createRouter, createWebHashHistory } from "vue-router";
import Swal from "sweetalert2";
import { useLoadingStore } from "@/stores";
import { SysConstants, DocTitleUtils, AlertComSetting } from "@/helpers";
import { AuthService, Redirector } from "@/services";
import { EventDetailRouterTool } from "@/services/features";
import homeView from "../views/HomeView.vue";

// 路由列表
const routes = [
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
    meta: { title: `活動列表` },
  },
  // 活動資訊頁
  {
    path: EventDetailRouterTool.routePath,
    name: EventDetailRouterTool.routeName,
    component: () => import("@/views/EventDetailView.vue"),
    // meta: { title: (route) => `活動資訊 ${route.params.id}` },
  },
  // 權限相關頁面
  {
    path: "/auth",
    name: "auth",
    redirect: { name: "NotFound" },
    children: [
      // 修改會員資料頁
      {
        path: "user",
        name: "modifyUser",
        component: () => import("@/views/ModifyUserView.vue"),
        meta: {
          title: `修改會員資料`,
          isRequiresLogin: true,
        },
      },
    ],
  },
  // 訂單相關頁面
  {
    path: "/order",
    name: "order",
    redirect: { name: "NotFound" },
    children: [
      {
        path: "confirmation",
        name: "orderConfirmation",
        component: () => import("@/views/order/OrderConfirmation.vue"),
        meta: {
          title: `訂單確認`,
          isRequiresLogin: true,
        },
      },
      {
        path: "checkout",
        name: "orderCheckout",
        component: () => import("@/views/order/OrderCheckout.vue"),
        meta: {
          title: `結帳付款`,
          isRequiresLogin: true,
        },
      },
      {
        path: "result",
        name: "orderResult",
        component: () => import("@/views/order/OrderResult.vue"),
        meta: {
          title: `訂購結果`,
          isRequiresLogin: true,
        },
      },
    ],
  },
  // 測試
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test/TestView.vue"),
    meta: { title: `測試` },
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
      {
        path: "user",
        name: "testUser",
        component: () => import("@/views/test/TestUser.vue"),
      },
      {
        path: "cookie",
        name: "testCookie",
        component: () => import("@/views/test/TestCookie.vue"),
      },
      {
        path: "errormsg",
        name: "testErrorMsg",
        component: () => import("@/views/test/TestErrorMsg.vue"),
      },
    ],
  },
  // 404
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFoundView.vue"), // 使用客製的頁面
  },
];

// 路由器
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

    // 否則捲到頁面頂端
    return { left: 0, top: 0, behavior: "instant" };
  },

  routes,
});

// 全域前置守衛：每次路由切換前執行
router.beforeEach((to, from, next) => {
  // 在進入頁面之前將 loading reset，以避免前一頁沒有正常關閉而造成問題
  useLoadingStore().reset();

  // 檢查權限
  // 不具備有效登入授權 且 前往的頁面需要登入才能進入
  if (!AuthService.checkValidPermission() && AuthService.isRequiresLogin(to.meta)) {
    /**
     * 以非正常的方式進入頁面可能有以下情形：
     * 1. 重整頁面會丟失 from.name 的資訊。
     * 2. 直接鍵入 URL：
     *    2-1. 相同的 URL，from.name、to.name 會一樣。
     *    2-2. 不同的 URL 則會不一樣。
     */

    // 顯示錯誤訊息 並且 不予進入下一頁（強迫停留在當頁）
    // 應用於 正常點擊功能進入、直接鍵入不同 URL 的情況
    if (from.name && from.name !== to.name) {
      const setting = AlertComSetting.error;
      setting.title = "請先登入";
      setting.text = "此功能需要登入才能使用！";
      Swal.fire(setting.getParamSet());

      next(false);
    }
    // 導回首頁（不允許停留在當頁）
    // 應用於 頁面重整、直接鍵入相同 URL 的情況
    else {
      Redirector.expire(() => {
        next("/");
      });
    }

    return;
  }

  next();
});

// 全域後置守衛：每次路由切換後執行
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  /** 設定頁面標題 */
  // 1) 先取得活動詳細資訊頁面的標題
  let title = EventDetailRouterTool.getEventTitle();

  // 2) 若 title 不為有效值，則由 meta.title 取得
  if (!title) {
    title = to.meta.title;
    title = typeof title === "function" ? title(to) : title;
  }

  // 3-1) 若有標題則串接主標題
  if (title) {
    title = DocTitleUtils.concatMainTitle(title);
  }
  // 3-2) 否則直接使用主標題
  else {
    title = DocTitleUtils.mainTitle;
  }

  document.title = title;
});

export default router;
