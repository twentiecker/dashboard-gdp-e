const appRoutes = [
  {
    path: "/",
    component: () => import("@/layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/app/HomeView.vue"),
      },
      {
        path: "insight/:category",
        name: "insight",
        component: () => import("@/views/app/InsightView.vue"),
      },
    ],
  },
];

export default appRoutes;
