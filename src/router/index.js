import { createRouter, createWebHistory } from "vue-router";
import AppLayout from "../layouts/AppLayout.vue";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import UserView from "../views/UserView.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/",
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
      },
      {
        path: "about",
        name: "about",
        component: AboutView,
      },
      {
        path: "user/:username",
        name: "profile",
        component: UserView,
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "login",
        component: LoginView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "hover:bg-red-500 bg-red-500",
  linkExactActiveClass: "hover:bg-red-500 bg-red-500",
});

router.beforeEach((to, from) => {
  const isLoggedIn = localStorage.getItem("isLogin") === "true";

  if (to.meta.requiresAuth && !isLoggedIn) return { name: "login" };
  else if (to.name === "login" && isLoggedIn) return { name: "home" };

  return true;
});

export default router;
