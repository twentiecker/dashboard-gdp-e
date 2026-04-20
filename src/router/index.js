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

  // restore session jika ada token
  if (!auth.user && auth.accessToken) {
    auth.init();
  }

  // =========================
  // AUTH CHECK
  // =========================
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !auth.isAuthenticated) {
    return { name: "login" };
  }

  // if (to.meta.requiresAuth && !auth.isAuthenticated) {
  //   return { name: "unauthorized" };
  // }

  // =========================
  // JIKA SUDAH LOGIN, TIDAK BISA KE LOGIN PAGE
  // =========================
  if (to.name === "login" && auth.isAuthenticated) {
    return { name: "home" };
  }

  // =========================
  // ROLE CHECK (MULTI ROLE)
  // =========================
  const allowedRoles = to.meta.roles;
  if (allowedRoles && !allowedRoles.includes(auth.user?.role)) {
    return { name: "unauthorized" };
  }

  // role check
  // if (to.meta.role && auth.user?.role !== to.meta.role) {
  //   return { name: "unauthorized" };
  // }

  return true;
});

export default router;
