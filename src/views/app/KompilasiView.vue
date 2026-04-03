<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getFiles, downloadFileUrl, viewFileUrl } from "@/services/fileService";

const route = useRoute();
const data = ref([]);

const pdbContent = {
  pengeluaran: {
    title: "PDB Pengeluaran",
  },
  produksi: {
    title: "PDB Produksi",
  },
};

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
    content.value = pdbContent[val] || {
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
        <Column field="file_name" header="FILE NAME"></Column>
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
