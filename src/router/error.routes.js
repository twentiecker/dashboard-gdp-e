const errorRoutes = [
  {
    path: "/error",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "unauthorized",
        name: "unauthorized",
        component: () => import("@/views/errors/UnauthorizedView.vue"),
      },
    ],
  },
];

export default errorRoutes;
