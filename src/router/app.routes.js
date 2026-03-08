const appRoutes = [
  {
    path: "/",
    component: () => import("@/layouts/AppLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/app/HomeView.vue"),
      },
      {
        path: "about",
        name: "about",
        component: () => import("@/views/app/AboutView.vue"),
      },
      {
        path: "user/:username",
        name: "profile",
        component: () => import("@/views/app/UserView.vue"),
      },
    ],
  },
];

export default appRoutes;
