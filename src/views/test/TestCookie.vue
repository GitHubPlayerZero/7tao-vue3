<template>
  <div class="d-flex flex-column row-gap-5">
    <div>
      <label for="cookieName" class="form-label">Cookie 名稱：</label>
      <input
        type="text"
        id="cookieName"
        class="form-control"
        placeholder="Cookie 名稱"
        v-model="cookieName"
      />
    </div>

    <div>
      <label for="cookieValue" class="form-label">Cookie 值：</label>
      <input
        type="text"
        id="cookieValue"
        class="form-control"
        placeholder="Cookie 值"
        v-model="cookieValue"
      />
    </div>

    <button type="button" class="btn btn-primary py-3 px-5" @click="addCookie">新增 Cookie</button>
    <button type="button" class="btn btn-primary py-3 px-5" @click="checkCookie">
      判斷是否有此 Cookie
    </button>
    <button type="button" class="btn btn-primary py-3 px-5" @click="getCookie">取出 Cookie</button>
    <button type="button" class="btn btn-primary py-3 px-5" @click="modifyCookie">
      修改 Cookie
    </button>

    <button type="button" class="btn btn-primary py-3 px-5" @click="removeCookie">
      刪除 Cookie
    </button>
  </div>
</template>

<script>
import { Cookie, CookieHelper, SysConstants } from "@/helpers";

export default {
  data() {
    return {
      cookieName: SysConstants.cookieTokenName,
      cookieValue: "token12345",
    };
  },

  methods: {
    /** 新增 Cookie */
    addCookie() {
      console.log(`addCookie.......`);
      const cookie = new Cookie(this.cookieName);
      cookie.setValue(this.cookieValue);
      cookie.setMaxAge(SysConstants.cookieTokenTime);
      // cookie.isSecure(true);
      // cookie.setDomain("localhost");
      // cookie.setPath("/");
      CookieHelper.saveCookie(cookie);

      console.log(`after [addCookie] ==>`, document.cookie);
      console.log(``);
    },

    /** 判斷是否有此 Cookie */
    checkCookie() {
      console.log(
        `是否有 cookie [${this.cookieName}] ==>`,
        CookieHelper.hasCookie(this.cookieName)
      );
      console.log(``);
    },

    /** 取出 Cookie */
    getCookie() {
      console.log(`getCookie.......`);
      const value = CookieHelper.getCookie(this.cookieName);
      console.log("cookie result ==>", value, ",", typeof value, value.length);
      console.log(``);
    },
    
    modifyCookie() {
      console.log(`modifyCookie.......`);
      const cookie = new Cookie(this.cookieName);
      cookie.setValue(this.cookieValue);
      // cookie.isSecure(true);
      // cookie.setDomain("localhost");
      // cookie.setPath("/");
      CookieHelper.saveCookie(cookie);

      console.log(`after [modifyCookie] ==>`, document.cookie);
      console.log(``);
    },

    removeCookie() {
      const cookie = new Cookie(this.cookieName);
      // cookie.setPath("/");
      CookieHelper.removeCookie(cookie);
    },
  },
};
</script>

<style lang="scss" scoped></style>
