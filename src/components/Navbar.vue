<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goLogin = () => router.push("/login");
const goRegister = () => router.push("/register");

const items = ref([
  {
    label: "Beranda",
    icon: "pi pi-home",
    command: () => router.push("/"),
  },
  {
    label: "Insight Ekonomi",
    icon: "pi pi-palette",
    items: [
      { label: "Lembaga Internasional", route: "/insight/intl" },
      { label: "BRI", route: "/insight/bri" },
      { label: "Mandiri", route: "/insight/mandiri" },
      { label: "Kemenkeu", route: "/insight/kemenkeu" },
      { label: "Bank Indonesia", route: "/insight/bi" },
    ],
  },
]);
</script>

<template>
  <Menubar
    :model="items"
    class="sticky top-0 z-50"
    :pt="{
      rootList: {
        class: 'absolute left-1/2 -translate-x-1/2',
      },
    }"
  >
    <!-- KIRI: Logo -->
    <template #start>
      <div class="pl-2">
        <Image src="/logo-title.png" alt="Logo" width="100" />
      </div>
    </template>

    <!-- CUSTOM ITEMS (DITENGAHKAN) -->
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

    <!-- KANAN: Login & Register -->
    <template #end>
      <div class="flex items-center gap-2 pr-2">
        <Button label="Login" severity="secondary" text @click="goLogin" />
        <Button label="Register" severity="primary" @click="goRegister" />
      </div>
    </template>
  </Menubar>
</template>
