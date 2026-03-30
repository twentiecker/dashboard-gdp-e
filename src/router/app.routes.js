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
      {
        path: "data",
        name: "data",
        component: () => import("@/views/app/DataView.vue"),
      },
      {
        path: "kompilasi/:pdb",
        name: "kompilasi",
        component: () => import("@/views/app/KompilasiView.vue"),
      },
      {
        path: "suplemen",
        name: "suplemen",
        component: () => import("@/views/app/SuplemenView.vue"),
      },
    ],
  },
];

export default appRoutes;
