import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Dashboard.vue";
import Login from "../views/user/Login.vue";
import store from "../store/index.js";

// 접근 권한을 확인하는 함수
const checkAuthed = function (to, from, next) {
  if (store.state.loginInfo == null) {
    alert("로그인이 필요합니다");
    return next("/");
  } else {
    let isAuthorized = false;

    try {
      store.state.loginInfo.usrMnuAtrt.forEach(function (item) {
        item.nodeList.forEach(function (item) {
          if ("/dashboard" + item.mnu_url.replace(".do", "") == to.fullPath) {
            throw new Error("authorized");
          }

          if (item.mnu_dvs_cod == store.state.loginInfo.userType) {
            throw new Error("authorized");
          }
        });
      });
    } catch (e) {
      isAuthorized = true;
    }

    if (isAuthorized || to.fullPath == "/dashboard/home") {
      next();
    } else {
      alert("접근권한이 없습니다");
      next(from.fullPath);
    }
  }
};

// 라우트 정의
const routes = [
  {
    path: "/dashboard",
    name: "dashboard",
    children: [
      {
        path: ":type/:menu",
        component: () => import("../views/Content.vue"),
      },
      {
        path: "home",
        component: () => import("../views/Home.vue"),
      },
    ],
    beforeEnter: checkAuthed, // 라우트 이동 전 권한 확인
    component: Home,
  },
  {
    path: "/",
    name: "login",
    component: Login,
  },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // 해시 모드 대신 히스토리 모드 사용
  routes,
});

export default router;
