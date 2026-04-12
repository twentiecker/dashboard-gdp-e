<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getFiles, downloadFileUrl, viewFileUrl } from "@/services/fileService";
import { getFileType } from "@/utils/fileType";
import { categoryContent } from "@/constants/categoryContent";
import Disclaimer from "@/components/Disclaimer.vue";

const route = useRoute();
const data = ref([]);

const content = ref({ title: "" });

const loadFiles = async () => {
  try {
    const res = await getFiles(route.params.pdb);
    data.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

watch(
  () => route.params.pdb,
  (val) => {
    content.value = categoryContent[val] || {
      title: "Tidak ditemukan",
    };
    loadFiles();
  },
  { immediate: true },
);

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
    <Disclaimer
      content="Dokumen ini hanya diperuntukkan bagi internal Direktorat Neraca Pengeluaran dan tidak diperkenankan untuk disebarluaskan kepada pihak eksternal tanpa persetujuan Direktur."
    />
    <div class="flex flex-col gap-3">
      <DataTable
        :value="data"
        paginator
        :rows="10"
        tableStyle="min-width: 50rem"
      >
        <Column header="FILE NAME">
          <template #body="slotProps">
            <div class="flex items-center gap-3">
              <img
                :src="`/icons/${getFileType(slotProps.data.ext_name)}.png`"
                :alt="getFileType(slotProps.data.ext_name)"
                class="w-8"
              />
              <p>{{ slotProps.data.file_name }}</p>
            </div>
          </template>
        </Column>
        <Column field="size" header="SIZE"></Column>
        <Column field="date" header="DATE"></Column>
        <Column>
          <template #header>
            <div class="mx-auto">
              <span class="font-bold">ACTION</span>
            </div>
          </template>
          <template #body="slotProps">
            <div class="flex justify-center gap-3">
              <i
                class="pi pi-download cursor-pointer"
                @click="downloadFile(slotProps.data)"
              ></i
              ><i
                v-if="slotProps.data.ext_name === '.pdf'"
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
