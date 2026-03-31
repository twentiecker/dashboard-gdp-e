<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getFiles, downloadFileUrl, viewFileUrl } from "@/services/fileService";

const route = useRoute();
const data = ref([]);

const categoryContent = {
  intl: {
    title: "Lembaga Internasional",
    desc: "Laporan ekonomi global yang menyajikan gambaran terkini, proyeksi, dan isu strategis ekonomi dunia dari berbagai lembaga internasional.",
  },
  bri: {
    title: "BRI",
    desc: "Laporan ekonomi yang menyajikan gambaran terkini dan insight perekonomian dari ekonom Bank BRI.",
  },
  mandiri: {
    title: "Mandiri",
    desc: "Laporan ekonomi yang menyajikan gambaran terkini dan insight perekonomian dari ekonom Bank Mandiri.",
  },
  kemenkeu: {
    title: "Kemenkeu",
    desc: "Laporan ekonomi yang menyajikan gambaran terkini, kinerja fiskal, dan arah kebijakan pemerintah.",
  },
  bi: {
    title: "Bank Indonesia",
    desc: "Laporan ekonomi yang menyajikan gambaran terkini, proyeksi, dan arah kebijakan moneter serta stabilitas keuangan.",
  },
};

const content = ref({ title: "", desc: "" });

const loadFiles = async () => {
  try {
    const res = await getFiles(route.params.category);
    data.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

onMounted(loadFiles);

watch(
  () => route.params.category,
  (val) => {
    content.value = categoryContent[val] || {
      title: "Tidak ditemukan",
      desc: "",
    };
    loadFiles();
  },
  { immediate: true },
);

// const selectedCity = ref();
// const cities = ref([
//   { name: "New York", code: "NY" },
//   { name: "Rome", code: "RM" },
//   { name: "London", code: "LDN" },
//   { name: "Istanbul", code: "IST" },
//   { name: "Paris", code: "PRS" },
// ]);

const downloadFile = (file) => {
  const link = document.createElement("a");
  link.href = downloadFileUrl(file.path);
  link.download = file.original_name;
  link.click();
};

const viewFile = (file) => {
  window.open(viewFileUrl(file.path), "_blank");
};
</script>

<template>
  <div class="app-container">
    <h1>{{ content.title }}</h1>
    <p>{{ content.desc }}</p>
    <div class="flex flex-col gap-3">
      <!-- <BaseSelect
        v-model="selectedCity"
        :options="cities"
        optionLabel="name"
        optionValue="code"
        placeholder="Pilih kota"
      /> -->
      <DataTable
        :value="data"
        paginator
        :rows="10"
        responsiveLayout="stack"
        breakpoint="768px"
      >
        <Column field="file_name" header="FILE NAME"></Column>
        <Column field="size" header="SIZE"></Column>
        <Column field="date" header="DATE"></Column>
        <Column header="ACTION">
          <template #body="slotProps">
            <div class="flex gap-3">
              <i
                class="pi pi-download cursor-pointer"
                @click="downloadFile(slotProps.data)"
              ></i
              ><i
                class="pi pi-eye cursor-pointer"
                @click="viewFile(slotProps.data)"
              ></i>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
