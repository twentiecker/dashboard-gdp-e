<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

// =======================================================
// ========================= MENU ========================
// =======================================================
// const items = ref([
//   {
//     label: "Beranda",
//     icon: "pi pi-home",
//     command: () => router.push({ name: "home" }),
//   },
//   {
//     label: "Insight Ekonomi",
//     icon: "pi pi-chart-line",
//     items: [
//       { label: "Lembaga Internasional", route: "/insight/intl" },
//       { label: "BCA", route: "/insight/bca" },
//       { label: "DJSEF", route: "/insight/djsef" },
//       { label: "BRI", route: "/insight/bri" },
//       { label: "LPS", route: "/insight/lps" },
//       { label: "INDEF", route: "/insight/indef" },
//       { label: "Danamon", route: "/insight/danamon" },
//       { label: "Mandiri", route: "/insight/mandiri" },
//       { label: "Pefindo", route: "/insight/pefindo" },
//       { label: "Kemenko", route: "/insight/kemenko" },
//       { label: "Kemenkeu", route: "/insight/kemenkeu" },
//       { label: "Bank Indonesia", route: "/insight/bi" },
//       { label: "Samuel Sekuritas Indonesia", route: "/insight/samuel" },
//     ],
//   },
//   {
//     label: "Data & Indikator",
//     icon: "pi pi-database",
//     items: [
//       { label: "Data", route: "/data" },
//       {
//         label: "Lembar Kerja",
//         url: "https://license365bps-my.sharepoint.com/:x:/g/personal/nhagustina_license365bps_onmicrosoft_com/IQDW5BuHdwLfRbBrsFz10KCaARPuGWByW6mXAOLzkxo8rZ8?rtime=VUjpn92L3kg",
//         target: "_blank",
//       },
//       { label: "Dashboard", route: "/dashboard" },
//     ],
//   },
//   {
//     label: "Kompilasi Angka",
//     icon: "pi pi-calculator",
//     items: [
//       { label: "PDB Pengeluaran", route: "/kompilasi/pengeluaran" },
//       { label: "PDB Produksi", route: "/kompilasi/produksi" },
//     ],
//   },
//   {
//     label: "Suplemen",
//     icon: "pi pi-paperclip",
//     command: () => router.push({ name: "suplemen" }),
//   },
//   {
//     label: "Materi",
//     icon: "pi pi-book",
//     items: [
//       { label: "Vicon", route: "/materi/vicon" },
//       { label: "Rapat SM", route: "/materi/rapat" },
//       { label: "Paparan Pimpinan", route: "/materi/paparan" },
//       { label: "BRS", route: "/materi/brs" },
//       { label: "Lapres", route: "/materi/lapres" },
//     ],
//   },
// ]);
const items = computed(() => {
  const menus = [];
  const role = auth.user?.role;

  // ===== ROLE DNPENG =====
  // Hanya bisa lihat: Insight Ekonomi, Suplemen, Materi
  if (role === "dnpeng") {
    menus.push(
      {
        label: "Beranda",
        icon: "pi pi-home",
        command: () => router.push({ name: "home" }),
      },
      {
        label: "Insight Ekonomi",
        icon: "pi pi-chart-line",
        items: [
          { label: "Lembaga Internasional", route: "/insight/intl" },
          { label: "BCA", route: "/insight/bca" },
          { label: "DJSEF", route: "/insight/djsef" },
          { label: "BRI", route: "/insight/bri" },
          { label: "LPS", route: "/insight/lps" },
          { label: "INDEF", route: "/insight/indef" },
          { label: "Danamon", route: "/insight/danamon" },
          { label: "Mandiri", route: "/insight/mandiri" },
          { label: "Pefindo", route: "/insight/pefindo" },
          { label: "Kemenko", route: "/insight/kemenko" },
          { label: "Kemenkeu", route: "/insight/kemenkeu" },
          { label: "Bank Indonesia", route: "/insight/bi" },
          { label: "Samuel Sekuritas Indonesia", route: "/insight/samuel" },
        ],
      },
      {
        label: "Suplemen",
        icon: "pi pi-paperclip",
        command: () => router.push({ name: "suplemen" }),
      },
      {
        label: "Materi",
        icon: "pi pi-book",
        items: [
          { label: "Vicon", route: "/materi/vicon" },
          { label: "Rapat SM", route: "/materi/rapat" },
          { label: "Paparan Pimpinan", route: "/materi/paparan" },
          { label: "BRS", route: "/materi/brs" },
          { label: "Lapres", route: "/materi/lapres" },
        ],
      },
    );

    return menus;
  }

  // ===== MENU DEFAULT =====
  menus.push(
    {
      label: "Beranda",
      icon: "pi pi-home",
      command: () => router.push({ name: "home" }),
    },
    {
      label: "Insight Ekonomi",
      icon: "pi pi-chart-line",
      items: [
        { label: "Lembaga Internasional", route: "/insight/intl" },
        { label: "BCA", route: "/insight/bca" },
        { label: "DJSEF", route: "/insight/djsef" },
        { label: "BRI", route: "/insight/bri" },
        { label: "LPS", route: "/insight/lps" },
        { label: "INDEF", route: "/insight/indef" },
        { label: "Danamon", route: "/insight/danamon" },
        { label: "Mandiri", route: "/insight/mandiri" },
        { label: "Pefindo", route: "/insight/pefindo" },
        { label: "Kemenko", route: "/insight/kemenko" },
        { label: "Kemenkeu", route: "/insight/kemenkeu" },
        { label: "Bank Indonesia", route: "/insight/bi" },
        { label: "Samuel Sekuritas Indonesia", route: "/insight/samuel" },
      ],
    },
    {
      label: "Data & Indikator",
      icon: "pi pi-database",
      items: [
        // jika bukan lapres, tampilkan Data
        ...(role !== "lapres" ? [{ label: "Data", route: "/data" }] : []),

        {
          label: "Lembar Kerja",
          url: "https://license365bps-my.sharepoint.com/:x:/g/personal/nhagustina_license365bps_onmicrosoft_com/IQDW5BuHdwLfRbBrsFz10KCaARPuGWByW6mXAOLzkxo8rZ8?rtime=VUjpn92L3kg",
          target: "_blank",
        },

        // jika bukan lapres, tampilkan Dashboard
        ...(role !== "lapres"
          ? [{ label: "Dashboard", route: "/dashboard" }]
          : []),
      ],
    },
    {
      label: "Kompilasi Angka",
      icon: "pi pi-calculator",
      items: [
        { label: "PDB Pengeluaran", route: "/kompilasi/pengeluaran" },
        { label: "PDB Produksi", route: "/kompilasi/produksi" },
      ],
    },
    {
      label: "Suplemen",
      icon: "pi pi-paperclip",
      command: () => router.push({ name: "suplemen" }),
    },
    {
      label: "Materi",
      icon: "pi pi-book",
      items: [
        { label: "Vicon", route: "/materi/vicon" },
        { label: "Rapat SM", route: "/materi/rapat" },
        { label: "Paparan Pimpinan", route: "/materi/paparan" },
        { label: "BRS", route: "/materi/brs" },
        { label: "Lapres", route: "/materi/lapres" },
      ],
    },
  );

  return menus;
});

// =======================================================
// ====================== MEGA MENU ======================
// =======================================================
// const items = ref([
//   {
//     label: "Beranda",
//     icon: "pi pi-home",
//     command: () => router.push({ name: "home" }),
//   },
//   {
//     label: "Insight Ekonomi",
//     icon: "pi pi-chart-line",
//     items: [
//       [
//         {
//           label: "Bank",
//           items: [
//             { label: "Lembaga Internasional", route: "/insight/intl" },
//             { label: "BCA", route: "/insight/bca" },
//             { label: "DJSEF", route: "/insight/djsef" },
//             { label: "BRI", route: "/insight/bri" },
//             { label: "LPS", route: "/insight/lps" },
//             // { label: "INDEF", route: "/insight/indef" },
//             // { label: "Danamon", route: "/insight/danamon" },
//             // { label: "Mandiri", route: "/insight/mandiri" },
//             // { label: "Pefindo", route: "/insight/pefindo" },
//             // { label: "Kemenko", route: "/insight/kemenko" },
//             // { label: "Kemenkeu", route: "/insight/kemenkeu" },
//             // { label: "Bank Indonesia", route: "/insight/bi" },
//             // { label: "Samuel Sekuritas Indonesia", route: "/insight/samuel" },
//           ],
//         },
//       ],
//       [
//         {
//           label: "Ekonom",
//           items: [
//             // { label: "Lembaga Internasional", route: "/insight/intl" },
//             // { label: "BCA", route: "/insight/bca" },
//             // { label: "DJSEF", route: "/insight/djsef" },
//             // { label: "BRI", route: "/insight/bri" },
//             // { label: "LPS", route: "/insight/lps" },
//             { label: "INDEF", route: "/insight/indef" },
//             { label: "Danamon", route: "/insight/danamon" },
//             { label: "Mandiri", route: "/insight/mandiri" },
//             { label: "Pefindo", route: "/insight/pefindo" },
//             { label: "Kemenko", route: "/insight/kemenko" },
//             // { label: "Kemenkeu", route: "/insight/kemenkeu" },
//             // { label: "Bank Indonesia", route: "/insight/bi" },
//             // { label: "Samuel Sekuritas Indonesia", route: "/insight/samuel" },
//           ],
//         },
//       ],
//       [
//         {
//           label: "Lembaga Independen",
//           items: [
//             // { label: "Lembaga Internasional", route: "/insight/intl" },
//             // { label: "BCA", route: "/insight/bca" },
//             // { label: "DJSEF", route: "/insight/djsef" },
//             // { label: "BRI", route: "/insight/bri" },
//             // { label: "LPS", route: "/insight/lps" },
//             // { label: "INDEF", route: "/insight/indef" },
//             // { label: "Danamon", route: "/insight/danamon" },
//             // { label: "Mandiri", route: "/insight/mandiri" },
//             // { label: "Pefindo", route: "/insight/pefindo" },
//             // { label: "Kemenko", route: "/insight/kemenko" },
//             { label: "Kemenkeu", route: "/insight/kemenkeu" },
//             { label: "Bank Indonesia", route: "/insight/bi" },
//             { label: "Samuel Sekuritas Indonesia", route: "/insight/samuel" },
//           ],
//         },
//       ],
//     ],
//   },
//   {
//     label: "Data & Indikator",
//     icon: "pi pi-database",
//     items: [
//       [
//         {
//           label: "",
//           items: [
//             { label: "Data", route: "/data" },
//             {
//               label: "Lembar Kerja",
//               url: "https://license365bps-my.sharepoint.com/:x:/g/personal/nhagustina_license365bps_onmicrosoft_com/IQDW5BuHdwLfRbBrsFz10KCaARPuGWByW6mXAOLzkxo8rZ8?rtime=VUjpn92L3kg",
//               target: "_blank",
//             },
//             { label: "Dashboard", route: "/dashboard" },
//           ],
//         },
//       ],
//     ],
//   },
//   {
//     label: "Kompilasi Angka",
//     icon: "pi pi-calculator",
//     items: [
//       [
//         {
//           label: "",
//           items: [
//             { label: "PDB Pengeluaran", route: "/kompilasi/pengeluaran" },
//             { label: "PDB Produksi", route: "/kompilasi/produksi" },
//           ],
//         },
//       ],
//     ],
//   },
//   {
//     label: "Suplemen",
//     icon: "pi pi-paperclip",
//     command: () => router.push({ name: "suplemen" }),
//   },
//   {
//     label: "Materi",
//     icon: "pi pi-book",
//     items: [
//       [
//         {
//           label: "",
//           items: [
//             { label: "Vicon", route: "/materi/vicon" },
//             { label: "Rapat SM", route: "/materi/rapat" },
//             { label: "Paparan Pimpinan", route: "/materi/paparan" },
//             { label: "BRS", route: "/materi/brs" },
//             { label: "Lapres", route: "/materi/lapres" },
//           ],
//         },
//       ],
//     ],
//   },
// ]);

// const login = () => router.push({ name: "login" });
const logout = () => {
  auth.logout();
  router.push({ name: "login" });
};

const endMenu = ref();
// const endItems = computed(() => {
//   const items = [];

//   if (auth.user.role === "admin") {
//     items.push({
//       label: "Register",
//       icon: "pi pi-user-plus",
//       command: () => router.push({ name: "reegister" }),
//     });
//     items.push({
//       label: "Upload",
//       icon: "pi pi-upload",
//       command: () => router.push({ name: "upload" }),
//     });
//   }

//   items.push({
//     label: "Signout",
//     icon: "pi pi-sign-out",
//     command: () => logout(),
//   });

//   return items;
// });

const endItems = computed(() => {
  const items = [];

  if (auth.user.role === "admin") {
    const adminMenus = [
      { label: "Register", icon: "pi pi-user-plus", route: "register" },
      { label: "Upload", icon: "pi pi-upload", route: "upload" },
    ];

    items.push(
      ...adminMenus.map((m) => ({
        label: m.label,
        icon: m.icon,
        command: () => router.push({ name: m.route }),
      })),
    );
  }

  items.push({
    label: "Signout",
    icon: "pi pi-sign-out",
    command: () => logout(),
  });

  return items;
});

const toggle = (event) => {
  endMenu.value.toggle(event);
};
</script>

<template>
  <div class="sticky top-0 z-50">
    <Menubar
      :model="items"
      class="h-(--navbar-height)"
      :pt="{
        rootList: {
          class: '!gap-0 text-sm',
        },
      }"
    >
      <template #start>
        <Image src="/logo-title.png" alt="Logo" width="90" class="mx-2" />
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a
          v-else
          v-ripple
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
        >
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
      <template #end>
        <!-- <div v-if="!auth.user">
          <Button
            label="Login"
            text
            severity="contrast"
            icon="pi pi-sign-in"
            size="small"
            @click="login"
          />
        </div> -->
        <div>
          <Button
            type="button"
            text
            severity="contrast"
            size="small"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            ><div class="flex items-center gap-2">
              <Image src="/logo.png" alt="Image" width="21" />
              <span class="font-medium">{{ auth.user.role }}</span>
              <i class="pi pi-angle-down" style="font-size: 1rem"></i></div
          ></Button>
          <Menu
            ref="endMenu"
            id="overlay_menu"
            :model="endItems"
            :popup="true"
            :pt="{
              itemIcon: {
                class: '!text-xs',
              },
              itemLabel: {
                class: 'text-sm',
              },
            }"
          />
        </div>
      </template>
    </Menubar>
  </div>

  <!-- <div class="sticky top-0 z-50">
    <MegaMenu
      :model="items"
      class="h-(--navbar-height)"
      :pt="{
        rootList: {
          class: '!gap-0 text-sm',
        },
      }"
    >
      <template #start>
        <Image src="/logo-title.png" alt="Logo" width="90" class="mx-2" />
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a
          v-else
          v-ripple
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
        >
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
      <template #end>
        <div v-if="!auth.user">
          <Button
            label="Login"
            text
            severity="contrast"
            icon="pi pi-sign-in"
            size="small"
            @click="login"
          />
        </div>
        <div v-else>
          <Button
            type="button"
            text
            severity="contrast"
            size="small"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            ><div class="flex items-center gap-2">
              <Image src="/logo.png" alt="Image" width="21" />
              <span class="font-medium">{{ auth.user.role }}</span>
              <i class="pi pi-angle-down" style="font-size: 1rem"></i></div
          ></Button>
          <Menu
            ref="endMenu"
            id="overlay_menu"
            :model="endItems"
            :popup="true"
            :pt="{
              itemIcon: {
                class: '!text-xs',
              },
              itemLabel: {
                class: 'text-sm',
              },
            }"
          />
        </div>
      </template>
    </MegaMenu>
  </div> -->
</template>
