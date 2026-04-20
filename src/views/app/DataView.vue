<script setup>
import { ref, computed, onMounted } from "vue";
import { getFiles, downloadFileUrl, viewFileUrl } from "@/services/fileService";
import { getFileType } from "@/utils/fileType";
import { filterByFileName } from "@/utils/filterFile";
import { useAuthStore } from "@/stores/auth";
import Disclaimer from "@/components/Disclaimer.vue";

const auth = useAuthStore();

const allowedRoles = ["admin", "direktur", "konsolidator"];
const isAllowed = computed(() => allowedRoles.includes(auth.user?.role));

const selectedComp = ref({ name: "All", code: "" });
const components = ref([
  { name: "All", code: "" },
  { name: "PKRT", code: "pkrt" },
  { name: "PKLNPRT", code: "pklnprt" },
  { name: "PKP", code: "pkp" },
  { name: "PMTB", code: "pmtb" },
  { name: "PI", code: "pi" },
  { name: "XM", code: "xm" },
]);

const data = ref([]);

const loadFiles = async () => {
  try {
    const res = await getFiles("data");
    data.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const filteredData = computed(() =>
  filterByFileName(
    data.value,
    isAllowed.value ? selectedComp.value.code : auth.user?.role,
  ),
);

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
    <h1>Data</h1>
    <p>
      Kompilasi data dari Asosiasi/Kementerian/Lembaga/Dinas/Instansi untuk
      Penyusunan PDB Pengeluaran.
    </p>
    <Disclaimer
      content="Dokumen ini hanya diperuntukkan bagi internal Direktorat Neraca Pengeluaran dan tidak diperkenankan untuk disebarluaskan kepada pihak eksternal tanpa persetujuan Direktur."
    />
    <FloatLabel v-if="isAllowed" class="w-full" variant="in">
      <Select
        v-model="selectedComp"
        inputId="in_label"
        :options="components"
        optionLabel="name"
        class="w-full"
        variant="filled"
      />
      <label for="in_label">Components</label>
    </FloatLabel>
    <div class="flex flex-col gap-3">
      <DataTable
        :value="filteredData"
        paginator
        :rows="10"
        responsiveLayout="stack"
        breakpoint="768px"
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
