# Vue：7tao 活動購票網站

## 📖 簡介
**以 Vue 3 + Bootstrap 5 + Vite 為主軸的練習專案**，使用六角學院設計稿，從設計稿切版、樣式結構、共用邏輯底層、邏輯流程、API 規劃到專案架構，完整實踐一個真實網站的開發流程。

### 🎯 核心理念

此作品強調**紮實的深度思考與實做**——不僅是為了學習技術棧本身，更重要的是通過每個環節的摸索與實踐，培養專案規劃與架構的能力。

### 🔄 多種寫法的實驗

- **Options API** 為主、**Composition API** 為輔：同時練習兩種寫法，並驗證了它們可以共存於同一專案。
- **SCSS 模組化**：採用 Modules 寫法組織樣式。
- **Bootstrap 客製化**：覆寫核心變數與工具函數以達客製化目的。

### 🧩 共用邏輯架構

根據邏輯的性質分為兩種：

| 種類 | 實現方式 | 用途 | 位置 |
|------|--------|------|------|
| **純邏輯** | JS Class | API、工具函數、業務邏輯 | `src/api`、`src/helpers`、`src/services` |
| **Vue 特性相關** | Composables | 響應式、生命週期、Computed 等 | `src/composables` |

<br>

## 📋 目錄

- [功能特性](#✨-功能特性)
- [技術棧](#🛠%EF%B8%8F-技術棧)
- [API 服務](#🌐-API-服務)
- [應用架構](#🏗%EF%B8%8F-應用架構)
- [環境](#⚙%EF%B8%8F-環境)
- [開發指南](#💻-開發指南)

---

## ✨ 功能特性

### 🎨 用戶體驗

- 📱 響應式設計（Bootstrap 5 響應式框架）
- ⚙️ 全局 / 區域加載狀態管理
- ✔️ VeeValidate 表單驗證
- 🎞️ Swiper 輪播組件
- 🔔 SweetAlert2 提示框

### 🎫 網站資訊

- 🎯 重點活動展示（Banner）
- 💯 完整的活動列表展示
- 🔍 按標籤分類篩選
- 📸 相冊展示

### 👤 用戶認證

- 📝 註冊功能
- 🔑 登入 / 登出
- ✏️ 修改個人資料、密碼
- 🗑️ 帳戶刪除功能
- 🛡️ Token 認證機制

### 🛍️ 訂單系統

- 🎟️ 多種票券選擇
- ✅ 多步驟訂單確認流程
- 📊 訂購結果回饋

---

## 🛠️ 技術棧


| 分類 | 技術 | 用途 |
|------|------|------|
| **核心框架** | Vue 3、Vue Router、Vite | 前端框架、路由、構建工具 |
| **狀態管理** | Pinia、Pinia Plugin Persistedstate | 全局狀態 & 持久化 |
| **UI 框架 & 基礎樣式** | Bootstrap 5、SCSS、icofont | UI 框架、響應式設計、樣式寫法、圖標 |
| **UI 元件 / 互動套件** | Swiper、SweetAlert2、Vue Loading Overlay | 輪播、提示、加載 |
| **表單** | VeeValidate | 表單驗證 |
| **代碼質量** | ESLint、Prettier | 代碼檢查、代碼格式化 |
| **其他工具** | Axios、Nano ID | API 請求、ID 生成 |

<br>

### 核心框架

![Vue 3](https://img.shields.io/badge/Vue_3-JS_Framework-4FC08D?logo=vuedotjs&logoColor=white) ![Vue Router](https://img.shields.io/badge/Vue_Router-Routing-4FC08D?logo=vuedotjs&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-Build_Tool-9135FF?logo=vite&logoColor=white)

- **Vue 3**：以 Options API 為主，Composition API 為輔。
- **Vue Router**：Hash Mode 路由配置。
- **Vite**：現代化的構建工具，提供快速的開發體驗。

📝 [Vue Router 筆記](https://www.notion.so/Vue-Router-25f4f8650a50806eb5fcdd51c381bc8b)
<br>

### 狀態管理

![Pinia](https://img.shields.io/badge/Pinia-State_Management-FFD859?logo=pinia&logoColor=white) ![Pinia Plugin Persistedstate](https://img.shields.io/badge/Pinia_Plugin_Persistedstate-State_Management-FFD859?logo=pinia&logoColor=white)

- 以 [Pinia Plugin Persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/) 做持久化的管理：
  - 由於持久化會存放於 Local storage，因此 `userStore` 使用「部份持久化」做法以避免將機敏資訊也存入。
  - 由於當前的訂單流程資料不需要一直留存，因此 `orderStore` 特別指定使用 Session storage。

📝 [持久化配置筆記](https://www.notion.so/2ee4f8650a50803ab8fbdd609d1201b5)
<br>

### UI 框架 & 基礎樣式

![Bootstrap 5](https://img.shields.io/badge/Bootstrap-UI_Framework-7952B3?logo=bootstrap&logoColor=white) ![SCSS](https://img.shields.io/badge/SCSS-Styling-CC6699?logo=sass&logoColor=white) ![icofont](https://img.shields.io/badge/icofont-Icon-white)

- **Bootstrap 5**：響應式設計框架，覆寫 variables 與 utilities 進行客製化。
- **SCSS**：模組化開發，結構化管理樣式。
- **icofont**：豐富的圖標庫。

📝 [Bootstrap 互動視窗（Modal）筆記](https://www.notion.so/Modal-2fc4f8650a5080aa95dfca1860f12eb4) | [IcoFont 筆記](https://hackmd.io/-gIsepREQlWxb3gvkxAoLg)
<br>

### UI 元件 / 互動套件

![Swiper](https://img.shields.io/badge/Swiper-Carousel-6332F6?logo=swiper&logoColor=white) ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-Alerts-pink) ![Vue Loading Overlay](https://img.shields.io/badge/Vue_Loading_Overlay-Loading-blue)

- **Swiper**：輪播組件。
- **SweetAlert2**：美觀的提示框。
- **Vue Loading Overlay**：全局／區域加載狀態。

📝 [Swiper 筆記](https://hackmd.io/tb8o8VSxRsGKVj3Eg7ax5w) | [SweetAlert2 筆記](https://hackmd.io/AR2szIv-T_yry76faD6wTg) | [Vue Loading Overlay 筆記](https://hackmd.io/fRotG4TqR5C5aH3LwpbJAw)
<br>

### 表單
![VeeValidate](https://img.shields.io/badge/VeeValidate-Form_Validation-4FC08D?logo=vuedotjs&logoColor=white)

- **VeeValidate**：靈活的表單驗證方案。

📝 [VeeValidate 筆記](https://www.notion.so/VeeValidate-3004f8650a5080eb91abe98d8fecddb3)
<br>

### 代碼質量

![ESLint](https://img.shields.io/badge/ESLint-Code_Linting-4B32C3?logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-Code_Formatting-F7B93E?logo=prettier&logoColor=white)

- **ESLint**：使用 `no-underscore-dangle` 規則模擬 protected 效果。
- **Prettier**：結束必須要有分號、不強制轉換成單引號。
<br>

### 其他工具

![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?logo=axios&logoColor=white) ![Nano ID](https://img.shields.io/badge/Nano_ID-ID_Generator-white)

- **Axios**：HTTP 客戶端，用於 API 請求。
- **Nano ID**：輕量級 ID 生成器。

---

## 🌐 API 服務

### 服務架構

後端 API 採用 **JSON Server** 模擬實現，提供 RESTful 接口服務。
<br>

### 服務部署

整個 API 服務基於 GitHub 上的源代碼專案 [7tao-data](https://github.com/GitHubPlayerZero/7tao-data) 進行管理，包含完整的 JSON 數據模型、認證機制，以及部署配置。

| 部署平台 | 服務地址 | 部署方式 |
|--------|--------|--------|
| [Zeabur](https://zeabur.com/)（目前暫定） | https://7tao-data.zeabur.app/ | 自動化部署（連結 GitHub） |

<br>

### API 接口模組

| 模塊     | 文件                 | 功能                                    |
| -------- | -------------------- | --------------------------------------- |
| **用戶** | `userApi.js`         | 註冊、登入、修改資料、刪除帳戶          |
| **活動** | `eventApi.js`        | 活動列表、詳情、篩選、相簿、Banner 活動 |
| **訂單** | `orderApi.js`        | 創建、確認、結帳、結果                  |
| **票券** | `ticketApi.js`       | 活動票券資訊                            |
| **標籤** | `tagApi.js`          | 活動標籤名稱、列表、篩選                |
| **訂閱** | `subscriptionApi.js` | 訂閱管理                                |

<br>

### 使用

- **本地開發**：使用本地伺服器的 API 服務。需先下載、安裝源代碼專案，並啟動本地伺服器，詳細做法請參考源代碼專案的 README 說明。
- **產品環境**：使用部署平台的 API 服務。

#### 環境配置

將 API 服務地址存放於環境變數中（`VITE_API_BASE_URL`），以根據不同的開發階段選擇對應的地址。

| 環境 | 服務地址 | 配置文件 |
|-----|---------|--------|
| **開發環境** | http://localhost:3000/ | `.env.development` |
| **產品環境** | 部署平台的服務地址 | `.env.production` |

---

## 🏗️ 應用架構

### 邏輯分層

```
┌─────────────────────────────────┐
│        Router （路由）           │ ← 應用入口
├─────────────────────────────────┤
│         Views （頁面）           │
├─────────────────────────────────┤
│      Components （組件）         │
├─────────────────────────────────┤
│    Composables （組合式函數）    │
├─────────────────────────────────┤
│      Services （業務邏輯）       │
├─────────────────────────────────┤
│      Stores （狀態管理）         │
├─────────────────────────────────┤
│        API （接口調用）          │
├─────────────────────────────────┤
│       Helpers （工具函數）       │
└─────────────────────────────────┘
```

**各層說明：**

| 層名 | 功能 | 說明 |
|------|------|--------|
| **Router** | 路由配置、頁面導航、路由守衛 | 頁面跳轉、權限控制、認證檢查。 |
| **Views** | 頁面組件、佈局管理 | 與路由對應，展示不同頁面。 |
| **Components** | 可複用的 UI 組件 | 全局組件（如彈窗、卡片）、功能組件。 |
| **Composables** | 組合式函數 | 封裝與 Vue 特性相關的邏輯（響應式、生命週期等）。 |
| **Services** | 業務邏輯、資料處理 | API 調用聚合、數據格式化、業務邏輯聚合（如認證、特性邏輯等）。 |
| **Stores** | 全局狀態管理 | 用戶、訂單、加載狀態等。 |
| **API** | HTTP 請求管理 | 後端接口調用、統一認證配置。 |
| **Helpers** | 與框架無關的純邏輯工具 | 日期、型別、事件、Cookie、驗證等通用工具。 |

<br>

### 認証機制

#### 認証流程

```
1️⃣ 用戶登入
    ↓
2️⃣ AuthService.setLoginAuth(token, user)
    ├─ Token 存入 Cookie（設置過期時間）
    └─ 用戶信息存入 UserStore（自動持久化）
    ↓
3️⃣ 後續 API 調用自動帶入：
    Authorization: Bearer {token}
```

#### 路由守衛

需要登入才能使用的路由會添加額外的 meta 資訊：

```json
meta: { isRequiresLogin: true }
```

路由守衛會檢查 Token 有效性，若 Token 無效或過期會拋出錯誤，路由守衛會重定向到首頁。
<br>

### 目錄結構

| 文件夾 | 功能 |
|--------|------|
| 📁 `api/` | API 接口，負責各類 API 操作，如 event、user、order 等。 |
| 📁 `services/` | 業務邏輯，處理資料模型、特性邏輯、認證等。 |
| 📁 `stores/` | 全局狀態管理，包含全局加載狀態、使用者資料、訂單資料等。 |
| 📁 `composables/` | 組合式函數，包含分頁、計時、加載等。 |
| 📁 `components/` | UI 組件，包含全局組件、功能組件、認證相關組件等。 |
| 📁 `views/` | 頁面視圖，包含首頁、活動列表、活動詳情、訂單等。 |
| 📁 `helpers/` | 工具函數，負責與框架無關的各種純邏輯工具。 |
| 📁 `router/` | 路由配置。 |
| 📁 `assets/` | 靜態資源，處理樣式、第三方資源等。 |


<details>
<summary><strong>點擊展開完整目錄</strong></summary>

```
7tao-vue3/
├── public/           # 靜態資源
│  ├── images/        # 圖片文件
│  └── favicon.ico    # favicon
├── src/
│  ├── api/                      # API 層，後端接口調用
│  │  ├── api.js                   # API 父類別，負責建立 Axios 實例、認證配置
│  │  ├── eventApi.js              # 活動相關接口
│  │  ├── userApi.js               # 用戶相關接口
│  │  ├── orderApi.js              # 訂單相關接口
│  │  ├── ticketApi.js             # 票券相關接口
│  │  ├── tagApi.js                # 標籤相關接口
│  │  └── subscriptionApi.js       # 訂閱相關接口
│  ├── services/                 # 業務邏輯層
│  │  ├── authService.js           # 認證與授權管理
│  │  ├── dateService.js           # 日期服務
│  │  ├── redirector.js            # 重定向服務
│  │  ├── data/                    # 資料邏輯層，與 API 相關的資料處理
│  │  │  ├── model.js                # 數據模型父類別
│  │  │  ├── record.js               # 單筆記錄模型父類別
│  │  │  ├── album/                  # 相冊資料模型
│  │  │  ├── event/                  # 活動資料模型
│  │  │  ├── order/                  # 訂單資料模型
│  │  │  ├── ticket/                 # 票券資料模型
│  │  │  ├── user/                   # 用戶資料模型
│  │  │  └── subscription/           # 訂閱資料模型
│  │  └── features/                # 特性功能邏輯層
│  │     └── event/                  # 活動相關特性
│  ├── stores/                   # 狀態管理層 (Pinia)
│  │  ├── userStore.js             # 用戶狀態
│  │  ├── orderStore.js            # 訂單狀態
│  │  └── loadingStore.js          # 加載狀態
│  ├── composables/              # 組合式函數層
│  │  ├── usePagination.js         # 分頁
│  │  ├── useTimer.js              # 計時器
│  │  ├── data/                    # 數據相關
│  │  ├── event/                   # 活動相關
│  │  └── loading/                 # 加載相關
│  ├── helpers/                  # 工具層
│  │  ├── sysConstants.js          # 系統常數
│  │  ├── pathUtils.js             # 路徑工具
│  │  ├── imageUtils.js            # 圖片路徑處理
│  │  ├── typeUtils.js             # 型別相關處理
│  │  ├── errorHelper.js           # 錯誤處理
│  │  ├── loadingHelper.js         # 加載狀態
│  │  ├── veeValidateHelper.js     # VeeValidate 相關功能
│  │  ├── checkHelper.js           # 資料驗證
│  │  ├── dataUtils.js             # 資料格式處理
│  │  ├── docTitleUtils.js         # 文檔標題
│  │  ├── lineBreakUtils.js        # 處理換行
│  │  ├── alert/                   # 訊息窗相關
│  │  │  ├── alertParam.js           # SweetAlert2 參數相關處理
│  │  │  ├── alertComSetting.js      # 訊息窗各種常用設定
│  │  │  ├── alertModel.js           # 各種基本的訊息窗模型
│  │  │  ├── confirmAlert.js         # 提供有 confirm button 的訊息窗
│  │  │  └── timerAlert.js           # 與 timer 相關的訊息窗
│  │  ├── cookie/                  # Cookie 管理
│  │  │  ├── cookie.js               # Cookie 資料模型
│  │  │  └── cookieHelper.js         # 處理 Cookie 相關事務
│  │  ├── date/                    # 日期工具
│  │  │  ├── dateStyles.js           # 各種日期時間格式化樣式
│  │  │  └── dateUtils.js            # 日期時間處理工具
│  │  └── event/                   # 事件工具
│  │     ├── eventBase.js            # 事件工具父類別
│  │     └── keyboardHelper.js       # 鍵盤事件
│  ├── components/               # UI 組件層
│  │  ├── global/                  # 全局組件
│  │  │  ├── EventCard.vue           # 活動卡片
│  │  │  ├── IconTitle.vue           # 圖標標題
│  │  │  ├── MyModal.vue             # 自定義彈窗（供彈窗功能共用）
│  │  │  ├── PwdDisplaySwitch.vue    # 密碼顯示開關
│  │  │  ├── SimpleMsg.vue           # 簡單頁面訊息
│  │  │  └── header/                 # 頁首相關組件
│  │  ├── auth/                    # 認證相關組件
│  │  │  ├── LoginModal.vue          # 登入彈窗
│  │  │  ├── RegisterModal.vue       # 註冊彈窗
│  │  │  └── DeleteAccount.vue       # 刪除帳戶
│  │  ├── home/                    # 首頁相關組件
│  │  ├── eventDetail/             # 活動詳情組件
│  │  └── order/                   # 訂單相關組件
│  ├── views/                    # 頁面視圖層
│  │  ├── HomeView.vue             # 首頁
│  │  ├── EventListView.vue        # 活動列表頁
│  │  ├── EventDetailView.vue      # 活動詳情頁
│  │  ├── ModifyUserView.vue       # 修改用戶資料頁
│  │  ├── NotFoundView.vue         # 404 頁面
│  │  └── order/                   # 訂購流程相關頁面
│  │     ├── OrderConfirmation.vue   # 訂單確認
│  │     ├── OrderCheckout.vue       # 結帳付款
│  │     └── OrderResult.vue         # 訂購結果
│  ├── router/                   # 路由配置
│  │  └── index.js
│  ├── types/              # 類型定義層，存放各類 @typedef
│  ├── assets/             # 靜態資源
│  │  ├── scss/              # 樣式文件層，使用模組化開發
│  │  │  ├── all.scss          # 主樣式表
│  │  │  ├── base/             # 全站基礎樣式
│  │  │  ├── bootstrap/        # @forward 特定 Bootstrap 文件以利共用
│  │  │  ├── components/       # 共用元件樣式
│  │  │  ├── mixins/           # SCSS mixin 工具
│  │  │  └── utils/            # 通用樣式工具
│  │  └── vendors/           # 第三方資源（icon 字體等）
│  ├── App.vue             # 根組件
│  └── main.js             # 入口文件
├── .env                 # 共用環境變數
├── .env.development     # 開發階段環境變數
├── .env.production      # 產品階段環境變數
├── vite.config.js       # Vite 配置
├── eslint.config.js     # ESLint 配置
├── .prettierrc.json     # Prettier 配置
├── jsconfig.json        # JS 編譯配置
├── package.json         # 項目依賴
├── index.html           # HTML 入口
└── README.md            # 項目說明（本文件）
```

</details>

---

## ⚙️ 環境

### 環境要求

| 工具 | 版本 | 備註 |
|------|------|------|
| **Node.js** | >= 24.11.1 | 推薦使用 LTS 版本或更新 |
| **npm** | >= 11.11.0 | 隨 Node.js 一起安裝 |

> **💡 提示**：若尚未安裝，請從 [Node.js 官網](https://nodejs.org/) 下載安裝。

<br>

### 安裝專案
```bash
git clone https://github.com/GitHubPlayerZero/7tao-vue3.git
cd 7tao-vue3
npm install
```
<br>

### 常用指令

| 命令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器，支持熱模組重載。 |
| `npm run build` | 構建產品版本。 |
| `npm run deploy` | 自動構建產品版本並部署到 GitHub Pages。 |

---

## 💻 開發指南

### 📌 命名規範

#### kebab-case
用於 SCSS 開發中的所有**樣式相關命名**，包含檔案名、變數、Mixin 名稱、CSS Class 等。

- **示例：**
  ```scss
  // 檔案名
  _form-validation.scss
  
  // 變數
  $input-border-color
  $button-padding-base
  
  // Mixin
  @mixin flex-center
  @mixin text-truncate
  
  // CSS Class
  .form-group
  .btn-primary
  ```
<br>

#### camelCase
用於 JavaScript 檔案名、變數、函數等。

- **示例：**
  ```javascript
  // 檔案名
  eventService.js
  dateUtils.js
  
  // 變數
  const eventList = []
  const userEmail = "test@example.com"
  
  // 函數
  function fetchUserData() {}
  const handleSubmit = () => {}
  ```
<br>

#### PascalCase
用於 Vue 單文件組件（`.vue`）的檔案名以及 JavaScript Class 的名稱。

- **示例：**
  ```javascript
  // Vue 組件檔案名
  EventCard.vue
  LoginModal.vue
  
  // Class 名稱
  class AuthService {}
  class DateUtils {}
  ```
<br>

#### UPPER_SNAKE_CASE
可用於系統常數、配置值、枚舉值等，但目前未強制規定一定要使用 UPPER_SNAKE_CASE。

- **示例：**
  ```javascript
  // 常數定義
  const MAX_RETRY_COUNT = 3
  const DEFAULT_TIMEOUT = 5000
  
  // 枚舉值
  const ICON_OPTIONS = {
    WARNING: "warning",
    ERROR: "error",
    SUCCESS: "success",
    INFO: "info",
    QUESTION: "question",
  };
  ```
<br>

#### 特殊處理

| 情境 | 規則 | 示例 |
|------|------|------|
| **Boolean 類型變數** | 前綴使用 `is`、`has`、`can` | `isVisible`、`hasPermission`、`canDelete` |
| **Class 中 protected 變數／方法** | 前綴使用 `_`（下劃線） | `_datas = []`、`_assignData()` |
| **SCSS 用於被匯入的局部檔案 名稱** | 前綴使用 `_`（下劃線） | `_base.scss`、`_layout.scss` |
| **Hook／Composable 函數** | 前綴使用 `use` + PascalCase | `useEventDetailRouter()`、`useAreaLoading()` |

<br>

### 📌 環境變數配置管理

#### 核心原則

- **集中管理**：所有環境變數定義在環境配置文件中，並由 Class **`SysConstants`**（`helpers/sysConstants.js`）統一讀取，**禁止在業務代碼中直接讀取 `import.meta.env`**。
- **命名規範**：`SysConstants` 中的變數名應與環境配置文件中的變數名稱一致（移除開頭的 `VITE_`），並採用 **camelCase** 寫法，例：
  ```
  # env 檔案所定義的環境變數名稱
  VITE_API_BASE_URL
  
  # SysConstants 對應變數名稱
  apiBaseUrl
  ```
<br>

#### 環境配置文件

| 檔案 | 用途 | 加載時機 |
|------|------|--------|
| `.env` | 公共配置，所有環境通用 | 始終加載 |
| `.env.development` | 開發環境特定配置 | 執行 `npm run dev` 時加載 |
| `.env.production` | 產品環境特定配置 | 執行 `npm run build` 時加載 |

<br>

#### 使用

**1. 在環境配置文件中定義**
```
VITE_API_BASE_URL=http://localhost:3000/
```

**2. 在 `SysConstants` 中讀取**
```javascript
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
// ... 其他配置

export class SysConstants {
  static get apiBaseUrl() {
    return apiBaseUrl;
  }
  // ... 其他配置
}
```

**3. 在業務代碼中使用**
```javascript
// ✅ 推薦：使用 SysConstants
import { SysConstants } from "@/helpers";
const apiUrl = SysConstants.apiBaseUrl;

// ❌ 避免：直接讀取環境變數
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```
<br>

#### ⚠️ 環境變數訪問安全性

- **公開變數**：Vite 會自動將 `VITE_` 前綴的變數暴露到客戶端，因此**勿在環境變數中存放機敏資訊**（如 API 密鑰、密碼等）。
- **機敏配置**：應由後端提供，或透過認證接口動態獲取。
<br>

### 📌 狀態管理

本專案使用 **Pinia** 作為狀態管理方案，並透過 **Pinia Plugin Persistedstate** 實現狀態持久化。

#### 核心特性

- **寫法**：使用 **Composition API** 風格定義 store。
- **持久化支持**：根據業務需求選擇全部或部份持久化，支持 Local Storage 或 Session Storage。
- **現有 Store 參考**：
  - `userStore`：用戶資訊（部份持久化至 Local Storage，避免機敏資訊洩露）。
  - `orderStore`：訂單流程資料（使用 Session Storage，頁面關閉自動清除）。
  - `loadingStore`：全局加載狀態（不持久化）。
<br>

#### 創建 Store
**1. 創建 Store 文件**
在 **`stores`** 目錄下創建新的 store 文件，並使用 **Setup** 寫法，例如：

```javascript
// counterStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore(
  "counterStore",
  () => {
    const count = ref(0);
    const name = ref("Eduardo");
    const doubleCount = computed(() => count.value * 2);

    function increment() {
      count.value++;
    }

    return { count, name, doubleCount, increment };
  }
);
```

**2. 配置持久化策略**
| 場景 | 配置 | 說明 |
|------|------|------|
| **不持久化** | 不設置 `persist` | 預設 |
| **全部持久化** | `persist: true` | 所有狀態存入 Local Storage。 |
| **Session Storage** | 指定 `storage: sessionStorage` | 頁面關閉時自動清除。 |
| **部份持久化** | 指定 `pick` | 僅持久化指定的狀態屬性。 |

**全部持久化示例：**
```javascript
export const useCounterStore = defineStore(
  "counterStore",
  () => {
    // ... 略
  },
  {
    persist: true,
  }
);
```

**Session Storage 示例：**
```javascript
export const useCounterStore = defineStore(
  "counterStore",
  () => {
    // ... 略
  },
  {
    persist: {
      storage: sessionStorage, // 使用 Session Storage
    },
  }
);
```

**部份持久化示例：**
```javascript
// userStore.js
export const useUserStore = defineStore(
  "userStore",
  () => {
    const id = ref(null);
    const name = ref("");
    const token = ref(""); // ⚠️ 機敏資訊，不應持久化

    return { id, name, token };
  },
  {
    persist: {
      pick: ["id", "name"], // 只持久化這些屬性
    },
  }
);
```

**3. 導出 Store**
於 **`stores/index.js`** 中添加導出：

```javascript
import { useCounterStore } from "./counterStore";
import { useUserStore } from "./userStore";

export { useCounterStore, useUserStore };
```

**4. 使用 Store**
```javascript
<template>
  <div>
    <p>Count: {{ counterStore.count }}</p>
    <p>Double Count: {{ counterStore.doubleCount }}</p>
    <button @click="counterStore.increment">Increment</button>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores";
const counterStore = useCounterStore();
</script>
```
<br>

### 📌 VeeValidate 表單驗證

本專案採用 **VeeValidate** 進行表單驗證，已於全局註冊其核心組件及規則，無需在每個組件中重複導入。環境初始、配置、規則調用等邏輯設定，統一撰寫於 helper 工具中。

#### 架構設計

| 層級 | 檔案 | 說明 |
|------|------|------|
| **規則定義** | `helpers/checkHelper.js` | 自訂驗證規則邏輯。 |
| **配置設定** | `helpers/veeValidateHelper.js` | VeeValidate 配置、規則調用管理。 |
| **初始化** | `main.js` | 調用 `VeeValidateHelper.initEnv()` 初始化驗證環境；註冊全局組件。 |

<br>

#### 全局組件
本專案已預先註冊以下 VeeValidate 核心組件，無需重複導入：

- **`VeeForm`**：表單容器，用於包裝所有表單控件。
- **`VeeField`**：表單輸入控件，支持 `type`、`name`、`rules` 等屬性。
- **`VeeErrorMessage`**：錯誤訊息組件。
<br>

#### 基本用法

```html
<VeeForm @submit="onSubmit">
  <!-- 電子信箱 -->
  <VeeField
    type="email"
    name="email"
    rules="required|email"
    label="Email"
    placeholder="請輸入 Email"
  />
  <VeeErrorMessage name="email" />
  
  <!-- 密碼 -->
  <VeeField
    type="password"
    name="password"
    rules="required|min:6"
    label="Password"
    placeholder="請輸入密碼（最少 6 字符）"
  />
  <VeeErrorMessage name="password" />
  
  <!-- 提交按鈕 -->
  <button type="submit">提交</button>
</VeeForm>
```
<br>

#### 驗證規則
官網預設提供多種驗證規則，可參考[官方規則](https://vee-validate.logaretm.com/v4/guide/global-validators#available-rules)。

若官方規則不足以滿足業務需求，可在 `checkHelper.js` 中定義自訂規則，然後於 `veeValidateHelper.js` 中進行調用。

**在 checkHelper.js 中定義規則：**
```javascript
export class CheckHelper {
  /**
   * 密碼格式：
   * 1. 只能使用英文及數字。
   * 2. 必須同時包含英文及數字。
   * 3. 長度為 8 ~ 12 碼。
   */
  static pwdPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;

  /**
   * 檢查是否為有效的密碼格式。
   * @param {string} password 密碼。
   * @returns {boolean} 驗證正確回傳 true，否則回傳 false。
   */
  static isValidPassword(password) {
    return this.pwdPattern.test(password);
  }
  
  // ... 略
}
```

**在 `veeValidateHelper.js` 中調用：**
```javascript
import { CheckHelper } from "./checkHelper";

VeeValidateHelper.initEnv = () => {
  // 註冊自訂規則（密碼）
  defineRule("password", (value) => {
    return CheckHelper.isValidPassword(value);
  });
  
  // ... 其他初始化邏輯
};
```

**在組件中使用：**
```html
<VeeField
  type="password"
  name="password"
  placeholder="請輸入密碼"
  maxlength="12"
  rules="required|password"
  label="密碼"
/>
```
<br>

### 📌 API 調用

#### 架構設計

將 API 調用分為兩層：

| 層級 | 功能 | 說明 |
|------|------|------|
| **API 層** | 直接調用後端接口 | 純粹的 HTTP 操作，不包含業務邏輯。 |
| **Service 層** | 業務邏輯處理 | 聚合 API 調用、數據處理、錯誤統一管理。 |

**核心原則：** 所有業務代碼（組件、Composable）只能透過 **Service 層** 調用 API，禁止直接調用 API 層。
<br>

#### 撰寫

**1️⃣ 建立 API 接口程式**

在 **`src/api`** 資料夾中創建基礎 API 接口程式，以 class 撰寫，須**繼承 `Api` 父類**。每個接口方法直接回傳 Promise，不做額外處理。

```javascript
// tagApi.js
import { Api } from "./api";

/**
 * Tag API 介接
 */
export class TagApi extends Api {
  // 定義資源 URL
  static get url() {
    return "/tags";
  }

  /**
   * 取得所有 Tag 資料。
   * @returns {Promise} 執行 axios 回傳的 Promise。
   */
  static fetchTags() {
    return this._axios.get(`${this.url}`);
  }
}
```

**2️⃣ 導出 API 類**

在 **`src/api/index.js`** 中添加導出：

```javascript
import { TagApi } from "./tagApi";
export { TagApi };
```

**3️⃣ 於 Service 業務邏輯中調用 API**

在 **`src/services`** 資料夾中建立 Service 類，以 class 撰寫。

```javascript
// data/tag/tagService.js
import { TagApi } from "@/api";
import { ErrorHelper } from "@/helpers";

export class TagService {
  /**
   * 取得所有 Tag 資料。
   * 對應於 {@link TagApi.fetchTags} 的處理。
   * @returns {Promise<Object[]>} 由後端取回的資料，預設空陣列。
   */
  static async fetchTags() {
    let result;
    await TagApi.fetchTags()
      .then((res) => {
        result = res.data;
      })
      .catch((error) => {
        console.error(`[fetchTags] Axios ERROR ==>`, ErrorHelper.getAxiosFullError(error));
      });
    return result || [];
  }

  // ... 略
}
```

**4️⃣ 在組件中調用 Service**
```javascript
<script>
import { TagService } from "@/services/data/tag";

export default {
  created() {
    TagService.fetchTags().then((res) => {
      // do something...
    });
  },
};

// ... 略
</script>
```
<br>

#### 認證機制

`Api` 父類提供 **`authConfig`** 靜態屬性，用於獲取認證 Header：

```javascript
import { AuthService } from "@/services";

export class Api {
  /**
   * 取得帶有授權資訊的 headers。
   * @returns {{headers: {Authorization: String}}} 包含授權資訊的 headers。
   * @throws {Error} 如果使用者沒有權限，則拋出錯誤。
   */
  static get authConfig() {
    const token = AuthService.getToken();
    if (!token) {
      throw Error("使用者沒有權限！");
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  
  // ... 略
}
```

所有 API 子類可以直接取用：

```javascript
import { Api } from "./api";

export class UserApi extends Api {
  // 取得自己的 User 資料。
  // ⚠️ 若無 token 會拋出錯誤
  static fetchSelf(id) {
    return this._axios.get("/600/users", Api.authConfig);
  }
  
  // ... 略
}
```
<br>

### 📌 Modal 視窗

本專案使用 **`MyModal.vue`** 作為統一的彈出視窗組件，以 Bootstrap 5 Modal 為基礎。提供插槽以自訂畫面；提供 Emits 用以操作 Modal 各階段事件；提供開啟與關閉 Modal 的方法供父元件直接調用。

#### 基本用法

```vue
<template>
  <MyModal ref="testModal" id="testModal" title="彈窗標題" @emit-shown="shown">
    <!-- Header 插槽（可選，預設顯示 title）-->
    <template #modalHeader>
      <p class="modal-title h5">自訂標題</p>
    </template>

    <!-- Body 插槽（必須）-->
    <template #modalBody>
      <p>彈窗內容</p>
    </template>

    <!-- Footer 插槽（可選）-->
    <template #modalFooter>
      <button type="button" @click="submit">送出</button>
      <button type="button" @click="cancel">取消</button>
    </template>
  </MyModal>
</template>

<script setup>
import { useTemplateRef } from "vue";
import MyModal from "@/components/global/MyModal.vue";

const refTestModal = useTemplateRef("testModal");

/**
 * Modal 視窗顯示時的動作。
 */
function shown() {
  console.log("shown!");
}

// 送出
function submit() {
  // 執行送出動作...
}

// 取消
function cancel() {
  refTestModal.value.state.close(); // 關閉彈窗
}
</script>
```
<br>

#### 插槽（Slots）

| 插槽名 | 說明 |
| --- | --- |
| `modalHeader` | 自訂彈窗頁首，若不提供則預設顯示 `title` |
| `modalBody` | 彈窗內容 |
| `modalFooter` | 自訂彈窗頁尾，通常會放置按鈕 |

<br>

#### Props 配置

| 屬性名 | 類型 | 預設值 | 說明 |
| --- | --- | --- | --- |
| `id` | String | - | 彈窗唯一標識，**必須** |
| `title` | String | - | 彈窗標題 |
| `isAllowBackdrop` | Boolean | `false` | 是否允許點擊背景關閉彈窗 |
| `isAllowEsc` | Boolean | `true` | 是否允許按下 Esc 鍵關閉彈窗 |

<br>

#### 事件（Emits）

| 事件名 | 觸發時機 |
| --- | --- |
| `emit-show` | 彈窗開啟前 |
| `emit-shown` | 彈窗開啟後 |
| `emit-hide` | 彈窗關閉前 |
| `emit-hidden` | 彈窗關閉後 |

<br>

#### 方法調用

通過 template ref 取得組件實例，並呼叫以下方法：

```javascript
// 打開彈窗
refTestModal.value.state.open();

// 關閉彈窗
refTestModal.value.state.close();
```
<br>

### 📌 Alert 視窗

本專案使用 **SweetAlert2** 作為提示窗的基礎，並透過 **`helpers/alert`** 資料夾下的工具進行統一管理，所有 Alert 訊息的配置、樣式、邏輯都集中於此，方便維護和擴展。

#### 核心模塊
統一於 **`helpers/index.js`** 中添加導出。

| 程式 | 功能 |
| --- | --- |
| `alertParam.js` | SweetAlert2 參數設定類 |
| `alertComSetting.js` | 常用的設定套裝（基本、成功、錯誤、警告等） |
| `alertModel.js` | 基本訊息窗模型（可混合參數建立自訂窗口） |
| `confirmAlert.js` | 預設有 Confirm Button 的訊息窗 |
| `timerAlert.js` | 時間到自動關閉的訊息窗及倒數計時窗 |

<br>

#### AlertParam 常用參數

| 參數 | 說明 | 範例 |
| --- | --- | --- |
| `title` | 訊息標題（HTML） | `"<span class='text-danger'>刪除帳號</span>"` |
| `titleText` | 訊息標題（純文字） | `"刪除帳號"` |
| `html` | 訊息內容（HTML） | `"<p>保存<strong>成功</strong></p>"` |
| `text` | 訊息內容（純文字） | `"保存成功"` |
| `icon` | 圖示 | `AlertParam.ICON_OPTIONS.SUCCESS` |
| `position` | 視窗位置 | `AlertParam.POSITION_OPTIONS.TOP` |
| `confirmButtonText` | Confirm 按鈕文字 | `"確認"` |
| `confirmButtonColor` | Confirm 按鈕顏色 | `"var(--bs-danger)"` |
| `allowOutsideClick` | 是否允許點擊外部關閉 | `false` |
| `allowEscapeKey` | 是否允許 ESC 鍵關閉 | `false` |
| `showConfirmButton` | 是否顯示 Confirm 按鈕 | `true` |
| `timer` | 自動關閉時間（毫秒） | `1200` |
| `timerProgressBar` | 是否顯示計時器進度條 | `true` |
| `customClass` | 自訂 CSS Class | `new AlertCustomClass()` |

<br>

#### 使用範例
- **簡單提示訊息**
  ```javascript
  import { ConfirmAlert } from "@/helpers";

  // 成功訊息
  ConfirmAlert.alertSuccess("操作成功！");

  // 警告訊息
  ConfirmAlert.alertWarning("請確認您的操作");

  // 警告訊息（含詳細說明）
  ConfirmAlert.alertWarningDetail("警告", "這是詳細說明");

  // 錯誤訊息（具有強制注意效果）
  ConfirmAlert.alertError("發生錯誤！");

  // 錯誤訊息（含詳細說明）
  ConfirmAlert.alertErrorDetail("錯誤", "這是詳細說明");

  // 權限錯誤
  ConfirmAlert.alertPermissionError();
  ```

- **自動關閉的 Timer 訊息**
  ```javascript
  import { TimerAlert } from "@/helpers";

  // 成功訊息，時間到自動關閉（預設 1.2 秒）
  TimerAlert.alertSuccess("保存成功！");
  ```

- **倒數計時訊息（時間到執行回呼函式）**
  ```javascript
  import { TimerAlert, CountdownCallbackTimerParam } from "@/helpers";

  // 建立倒數計時參數
  const param = new CountdownCallbackTimerParam(5); // 5 秒倒數（若未給入參數則預設 10 秒）
  param.title = "註冊成功！";
  param.desc = "頁面即將刷新"; // 附加說明

  // 時間到時執行的回呼函式
  param.callback = () => {
    // 執行的動作...
  };

  // 顯示倒數計時訊息
  TimerAlert.alertCountdownCallback(param);
  ```

- **自訂訊息窗**
  若需要建立自訂樣式的訊息窗，可使用 `AlertModel` 和 `AlertParam`：

  ```javascript
  import { AlertModel, AlertParam, AlertComSetting } from "@/helpers";

  // 建立自訂參數
  const customParam = new AlertParam();
  customParam.title = "自訂標題";
  customParam.text = "自訂內容";
  customParam.icon = AlertParam.ICON_OPTIONS.INFO;
  customParam.confirmButtonColor = "var(--bs-primary)";
  customParam.confirmButtonText = "確認";

  // 方法一：直接使用 getMixinModel 建立訊息窗
  const customAlert = AlertModel.getMixinModel(customParam);
  customAlert.fire();

  // 方法二：混合預設設定與自訂參數
  const baseAlert = AlertModel.baseModel.mixin(customParam.getParamSet());
  // const baseAlert = AlertModel.mixin(customParam.getParamSet(), AlertModel.baseModel); // 也可以這樣寫
  baseAlert.fire();
  ```

- **鎖定訊息窗**
  禁止使用者以傳統方式關閉訊息窗（ESC 鍵 或 點擊外部關閉）：

  ```javascript
  import { AlertComSetting, AlertModel } from "@/helpers/alert";

  const lockedAlert = AlertModel.baseModel.mixin(AlertComSetting.lock.getParamSet());
  AlertModel.mixTitle(lockedAlert, "訊息已鎖定").fire();
  ```

- **強制注意的訊息窗**
  用於需要使用者必須注意的重要訊息（如錯誤）：

  ```javascript
  // 強制注意的設定會：
  // 1. 禁止點擊外部關閉
  // 2. 禁止 ESC 鍵關閉
  // 3. 不聚焦在按鈕上以避免誤觸 Enter 鍵

  import { AlertComSetting, AlertModel } from "@/helpers/alert";

  const forcedAlert = AlertModel.baseModel.mixin(AlertComSetting.forceFocus);
  AlertModel.mixTitle(forcedAlert, "重要提示").fire();
  ```
<br>

### 📌 Loading

本專案使用 **Vue Loading Overlay** 作為加載狀態提示的基礎，並透過 **Pinia 狀態管理** 與 **Composable** 提供全局和區域兩種加載方式。

#### 核心模塊

| 程式 | 功能 |
| --- | --- |
| `helpers/loadingHelper.js` | 基礎加載配置 |
| `stores/loadingStore.js` | 全局加載狀態管理（Pinia Store） |
| `composables/loading/useAreaLoading.js` | 區域性加載（Composable） |

<br>

#### 加載配置

加載的基本設定定義在 **`LoadingSettings`** 中：

| 設定項 | 說明 | 預設值 |
| --- | --- | --- |
| `color` | 加載圖示顏色（CSS 語法） | `"blue"` |
| `loader` | 加載圖示樣式（"dots"、"bars"、"spinner" 等） | `"dots"` |
| `zIndex` | 遮罩 z-index 層級 | `1059` |
| `enforceFocus` | 是否強制成為焦點 | `false` |

<br>

#### 全局加載狀態計數機制

全局加載採用**計數機制**，允許多個組件同時使用加載而不會重複開啟、相互干擾。

- 每次**開啟**時會**增加**計數；**關閉**時會**減少**計數。
- 當 加載**尚未開啟** 且 **計數變為 1** 時，執行**開啟**加載。
- 當 加載**已開啟** 且 **計數 <= 0** 時，執行**關閉**加載。
<br>

#### 鍵盤保護

加載期間會自動屏蔽鍵盤操作，防止用戶在加載過程中使用鍵盤進行互動。
- **全局加載**：屏蔽整個 `#app` 區域的鍵盤操作。
- **區域加載**：屏蔽指定 DOM 元素的鍵盤操作。
<br>

#### 使用範例

**1. 全局加載**

在需要加載時使用 `useLoadingStore()` 來控制全局加載狀態：

```javascript
<script setup>
import { useLoadingStore } from "@/stores";
const loading = useLoadingStore();

// 打開加載
loading.open();

// 關閉加載
loading.close();
</script>
```

**2. 區域加載**

在特定區域顯示加載狀態，使用 `useAreaLoading()` Composable：

```javascript
<template>
  <div ref="area"> ...... </div>
</template>

<script setup>
import { useAreaLoading } from "@/composables";
import { useTemplateRef } from "vue";

const refArea = useTemplateRef("area");

onMounted(() => {
  // 初始化區域加載
  const loading = useAreaLoading(refArea.value);

  // 打開加載
  loading.open();

  // 關閉加載
  loading.close();
});
</script>
```

或者傳入自訂設定選項：

```javascript
const loading = useAreaLoading(refArea.value, {
  color: "red",        // 加載圖示顏色（CSS 顏色值）
  loader: "spinner",   // 加載樣式："spinner"、"dots"、"bars"
  backgroundColor: "gray",  // 背景遮罩顏色
  opacity: 0.8,        // 背景遮罩透明度 (0-1)
});
```
<br>

### 📌 Cookie

#### 核心模塊
工具放置於 **`helpers/cookie`** 資料夾，並於 **`helpers/index.js`** 添加導出。

| 程式 | 功能 |
| --- | --- |
| `cookie.js` | Cookie 資料模型 |
| `cookieHelper.js` | Cookie 操作工具 |

<br>

#### Cookie 資料模型
使用私有字段（#）隱藏實現細節，透過公開方法設定各項 Cookie 屬性。

| 方法 | 參數 | 說明 |
| --- | --- | --- |
| `constructor` | `name`（string） | 建立 Cookie 資料模型實例，`name` 為 Cookie 名稱，**必須提供**。 |
| `setValue` | `value`（string） | 設定 Cookie 的值 |
| `setMaxAge` | `maxAge`（number） | 設定 Cookie 最長存活時間（秒） |
| `setExpires` | `expires`（Date） | 設定 Cookie 過期時間（UTC 時間） |
| `setDomain` | `domain`（string） | 設定 Cookie 所屬網域 |
| `setPath` | `path`（string） | 設定 Cookie 所屬路徑 |
| `isSecure` | `bool`（boolean） | 是否設定為安全 Cookie（僅透過 HTTPS 傳輸） |
| `toString` | - | 將 Cookie 轉成字串，用於 `document.cookie` |

<br>

#### Cookie 操作工具
提供靜態方法實現 Cookie 的保存、刪除、檢查、取得等操作。

| 方法 | 參數 | 回傳 | 說明 |
| --- | --- | --- | --- |
| `saveCookie` | `cookie`（Cookie） | - | 保存 Cookie（新增或修改） |
| `removeCookie` | `cookie`（Cookie） | - | 刪除 Cookie |
| `hasCookie` | `name`（string） | boolean | 判斷是否存在指定的 Cookie |
| `getCookie` | `name`（string） | string | 取得 Cookie 的值 |

**注意：** Cookie 的保存與刪除以 **`name` + `domain` + `path`** 作為識別依據。
<br>

#### 環境配置

| 名稱 | 值 | SysConstants | 說明 |
| --- | --- | --- | --- |
| `VITE_COOKIE_TOKEN_NAME` | `user` | `cookieTokenName` | Token 存放在 Cookie 中的名稱 |
| `VITE_COOKIE_TOKEN_TIME` | `3540` （59 分鐘） | `cookieTokenTime` | Token 存放在 Cookie 中的有效時間（秒） |

<br>

#### 使用範例

**1. 保存 token**

```javascript
import { SysConstants, Cookie, CookieHelper } from "@/helpers";

// 建立 Cookie 實例
const cookie = new Cookie(SysConstants.cookieTokenName);
cookie.setMaxAge(SysConstants.cookieTokenTime);
cookie.setValue(token);

// 保存 Cookie
CookieHelper.saveCookie(cookie);
```

**2. 取得 token**

```javascript
import { SysConstants, CookieHelper } from "@/helpers";
const token = CookieHelper.getCookie(SysConstants.cookieTokenName);
```

**3. 檢查 token 是否存在**

```javascript
import { SysConstants, CookieHelper } from "@/helpers";

if (CookieHelper.hasCookie(SysConstants.cookieTokenName)) {
  console.log("Cookie 存在");
} else {
  console.log("Cookie 不存在");
}
```

**4. 刪除 token**

```javascript
import { SysConstants, Cookie, CookieHelper } from "@/helpers";
CookieHelper.removeCookie(new Cookie(SysConstants.cookieTokenName));
```
