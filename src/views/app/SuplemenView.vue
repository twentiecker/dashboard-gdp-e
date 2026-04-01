<script setup>
import { ref, onMounted, watch } from "vue";
import { getFiles, downloadFileUrl, viewFileUrl } from "@/services/fileService";

const data = ref([]);

const loadFiles = async () => {
  try {
    const res = await getFiles("suplemen");
    data.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

onMounted(loadFiles);

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
    <h1>Suplemen</h1>
    <p>
      Informasi yang menyajikan data dan indikator pendukung yang memberikan
      gambaran terkini mengenai dinamika perekonomian Indonesia.
    </p>
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
