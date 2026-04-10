import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import authRoutes from "@/router/auth.routes";
import appRoutes from "@/router/app.routes";
import errorRoutes from "@/router/error.routes";

const routes = [...authRoutes, ...appRoutes, ...errorRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (!auth.user && auth.accessToken) {
    auth.init();
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: "unauthorized" };
  }

  if (to.name === "login" && auth.isAuthenticated) {
    return { name: "home" };
  }

  if (to.meta.role && auth.user?.role !== to.meta.role) {
    return { name: "unauthorized" };
  }

  return true;
});

export default router;
