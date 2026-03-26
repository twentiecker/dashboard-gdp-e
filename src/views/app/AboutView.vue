<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const data = ref([]);
const BASE_URL = "https://dnpeng-backend-fastapi-production.up.railway.app";
const getPkrtData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/pkrt/`, {
      params: {
        kode: "MB105",
        periode: "",
      },
    });

    data.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getPkrtData();
});
</script>

<template>
  <div class="app-container">
    <h1>About View</h1>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem explicabo
      perferendis recusandae quod nostrum reprehenderit pariatur libero quas
      alias porro expedita enim ipsa facere, dolores voluptatum distinctio
      aliquid earum corrupti quam corporis doloribus cumque? Dignissimos, illo
      quis. Maxime iste, rem obcaecati in dolorem adipisci et fuga voluptatum
      quaerat? Iste, pariatur? Dicta ex harum quasi?
    </p>
    {{ data }}
  </div>
</template>
