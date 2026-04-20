const appRoutes = [
  {
    path: "/",
    component: () => import("@/layouts/AppLayout.vue"),
    meta: { requiresAuth: true }, // 🔥 NEED TO LOGIN
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/app/HomeView.vue"),
        meta: {
          roles: [
            "admin",
            "direktur",
            "konsolidator",
            "pkrt",
            "pklnprt",
            "pkp",
            "pmtb",
            "pi",
            "xm",
            "lapres",
            "dnpeng",
          ],
        },
      },
      {
        path: "insight/:category",
        name: "insight",
        component: () => import("@/views/app/InsightView.vue"),
        meta: {
          roles: [
            "admin",
            "direktur",
            "konsolidator",
            "pkrt",
            "pklnprt",
            "pkp",
            "pmtb",
            "pi",
            "xm",
            "lapres",
            "dnpeng",
          ],
        },
      },
      {
        path: "data",
        name: "data",
        component: () => import("@/views/app/DataView.vue"),
        meta: {
          roles: [
            "admin",
            "direktur",
            "konsolidator",
            "pkrt",
            "pklnprt",
            "pkp",
            "pmtb",
            "pi",
            "xm",
          ],
        },
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/app/DashboardView.vue"),
        meta: {
          roles: [
            "admin",
            "direktur",
            "konsolidator",
            "pkrt",
            "pklnprt",
            "pkp",
            "pmtb",
            "pi",
            "xm",
          ],
        },
      },
      {
        path: "kompilasi/:pdb",
        name: "kompilasi",
        component: () => import("@/views/app/KompilasiView.vue"),
        meta: {
          roles: [
            "admin",
            "direktur",
            "konsolidator",
            "pkrt",
            "pklnprt",
            "pkp",
            "pmtb",
            "pi",
            "xm",
            "lapres",
          ],
        },
      },
      {
        path: "suplemen",
        name: "suplemen",
        component: () => import("@/views/app/SuplemenView.vue"),
        meta: {
          roles: [
            "admin",
            "direktur",
            "konsolidator",
            "pkrt",
            "pklnprt",
            "pkp",
            "pmtb",
            "pi",
            "xm",
            "lapres",
            "dnpeng",
          ],
        },
      },
      {
        path: "materi/:category",
        name: "materi",
        component: () => import("@/views/app/MateriView.vue"),
        meta: {
          roles: [
            "admin",
            "direktur",
            "konsolidator",
            "pkrt",
            "pklnprt",
            "pkp",
            "pmtb",
            "pi",
            "xm",
            "lapres",
            "dnpeng",
          ],
        },
      },
      {
        path: "upload",
        name: "upload",
        component: () => import("@/views/app/UploadView.vue"),
        meta: {
          roles: ["admin"],
        },
      },
    ],
  },
];

export default appRoutes;
