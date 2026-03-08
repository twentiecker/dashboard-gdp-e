<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const logout = () => {
  localStorage.removeItem("isLogin");
  router.push({ name: "login" });
};
</script>

<template>
  <nav class="flex items-center justify-between py-10">
    <Image src="/vite.svg" alt="Logo" />
    <div class="flex gap-5">
      <router-link :to="{ name: 'home' }" class="hover:bg-blue-500 rounded p-2"
        >Home</router-link
      >
      <router-link :to="{ name: 'about' }" class="hover:bg-blue-500 rounded p-2"
        >About</router-link
      >
      <router-link
        :to="{ name: 'profile', params: { username: 'Robert' } }"
        class="hover:bg-blue-500 rounded p-2"
        >Profile</router-link
      >
    </div>
    <Button icon="pi pi-sign-out" aria-label="Save" @click="logout" />
  </nav>
</template>
