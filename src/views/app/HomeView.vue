<script setup>
import { ref, onMounted } from "vue";
import { getRecentFiles } from "@/services/fileService";
import { categoryContent } from "@/constants/categoryContent";
import CardGrid from "@/components/CardGrid.vue";

const cards = ref([]);
const loading = ref(false);

const mapToCard = (file) => {
  return {
    id: file.id,
    filename: file.filename,
    date: file.date,
    size: file.size,
    filePath: file.file_path,
    jenisFile: categoryContent[file.jenis_file].title,
  };
};

const fetchRecentFiles = async () => {
  try {
    loading.value = true;
    const response = await getRecentFiles(8);
    cards.value = response.data.map(mapToCard);
  } catch (error) {
    console.error("Error fetching recent files:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchRecentFiles();
});
</script>

<template>
  <div class="flex flex-col mb-5">
    <Image
      src="/banner.png"
      alt="Image"
      :pt="{
        image: {
          class: 'w-full h-[calc(80vh-var(--navbar-height))] object-cover',
        },
      }"
    />
  </div>
  <div class="app-container">
    <div>
      <div class="flex items-center gap-3">
        <i class="pi pi-folder-open" style="font-size: 1.5rem"></i>
        <p class="font-semibold">Recent Documents</p>
      </div>
      <CardGrid :items="cards" />
    </div>
  </div>
</template>
