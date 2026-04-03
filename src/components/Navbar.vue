<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const items = ref([
  {
    label: "Beranda",
    icon: "pi pi-home",
    command: () => router.push("/"),
  },
  {
    label: "Insight Ekonomi",
    icon: "pi pi-chart-line",
    items: [
      { label: "Lembaga Internasional", route: "/insight/intl" },
      { label: "BRI", route: "/insight/bri" },
      { label: "BCA", route: "/insight/bca" },
      { label: "Mandiri", route: "/insight/mandiri" },
      { label: "Pefindo", route: "/insight/pefindo" },
      { label: "Kemenkeu", route: "/insight/kemenkeu" },
      { label: "Bank Indonesia", route: "/insight/bi" },
      { label: "Samuel Sekuritas Indonesia", route: "/insight/samuel" },
    ],
  },
  {
    label: "Data & Indikator",
    icon: "pi pi-database",
    items: [
      { label: "Data", route: "/data" },
      {
        label: "Indikator",
        url: "https://license365bps-my.sharepoint.com/:x:/g/personal/nhagustina_license365bps_onmicrosoft_com/IQDW5BuHdwLfRbBrsFz10KCaARPuGWByW6mXAOLzkxo8rZ8?rtime=VUjpn92L3kg",
        target: "_blank",
      },
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
    command: () => router.push("/suplemen"),
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
]);

const endMenu = ref([
  {
    label: "Upload",
    icon: "pi pi-cog",
    command: () => router.push("/upload"),
  },
  {
    separator: true,
  },
  {
    label: "Logout",
    icon: "pi pi-sign-out",
    command: () => console.log("logout"),
  },
]);

const menuRef = ref();
</script>

<template>
  <Menubar
    :model="items"
    class="sticky top-0 z-50 h-(--navbar-height)"
    :pt="{
      rootList: {
        class: '!gap-0',
      },
    }"
  >
    <template #start>
      <Image src="/logo-title.png" alt="Logo" width="100" />
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
      <div class="flex items-center gap-2">
        <Button
          text
          size="small"
          severity="secondary"
          @click="(event) => menuRef.toggle(event)"
          :pt="{
            root: {
              class: 'w-fit',
            },
          }"
        >
          <div class="flex items-center gap-2">
            <Avatar image="/logo.png" shape="circle" />
            <span>Admin</span>
            <i class="pi pi-angle-down" style="font-size: 1rem"></i>
          </div>
        </Button>
        <Menu ref="menuRef" :model="endMenu" popup />
      </div>
    </template>
  </Menubar>
</template>
