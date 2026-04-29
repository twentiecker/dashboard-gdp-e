<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => router.push({ name: "Home" });
</script>

<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="text-center max-w-md">
      <h2 class="font-bold text-red-500 mb-4">403</h2>
      <h1 class="mb-2">Unauthorized</h1>
      <p class="text-gray-500 mb-6">
        Kamu tidak memiliki akses ke halaman ini.
      </p>

      <div class="flex gap-3 justify-center">
        <Button
          icon="pi pi-home"
          label="Beranda"
          severity="secondary"
          @click="goHome"
        />
      </div>
    </div>
  </div>
</template>
