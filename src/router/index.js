import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "@/router/auth.routes";
import appRoutes from "@/router/app.routes";

const routes = [...authRoutes, ...appRoutes];

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
