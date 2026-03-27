import { createRouter, createWebHistory } from "vue-router";
import appRoutes from "@/router/app.routes";

const routes = [...appRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
