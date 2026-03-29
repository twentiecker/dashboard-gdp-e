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
      { label: "Mandiri", route: "/insight/mandiri" },
      { label: "Kemenkeu", route: "/insight/kemenkeu" },
      { label: "Bank Indonesia", route: "/insight/bi" },
    ],
  },
  {
    label: "Data & Indikator",
    icon: "pi pi-database",
    url: "https://license365bps-my.sharepoint.com/:x:/g/personal/nhagustina_license365bps_onmicrosoft_com/IQDW5BuHdwLfRbBrsFz10KCaARPuGWByW6mXAOLzkxo8rZ8?rtime=VUjpn92L3kg",
    target: "_blank",
  },
  {
    label: "Kompilasi Angka",
    icon: "pi pi-calculator",
    items: [
      { label: "PDB Pengeluaran", route: "/insight/intl" },
      { label: "PDB Produksi", route: "/insight/bri" },
    ],
  },
  {
    label: "Suplemen",
    icon: "pi pi-paperclip",
    command: () => router.push("/"),
  },
]);
</script>

<template>
  <Menubar
    :model="items"
    class="sticky top-0 z-50"
    :pt="{
      rootList: {
        class: 'lg:!ml-53 !gap-0',
      },
      button: {
        class: 'md:!ml-25',
      },
    }"
  >
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
      <div class="py-2 md:mr-25 lg:mr-53">
        <Image src="/logo-title.png" alt="Logo" width="150" />
      </div>
    </template>
  </Menubar>
</template>
