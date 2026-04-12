<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { getFiles, downloadFileUrl, viewFileUrl } from "@/services/fileService";
import { categoryContent } from "@/constants/categoryContent";
import { getFileType } from "@/utils/fileType";
import { filterByFileName } from "@/utils/filterFile";
import Disclaimer from "@/components/Disclaimer.vue";

const route = useRoute();
const data = ref([]);

const content = ref({ title: "", desc: "" });

const selectedOrg = ref({ name: "All", code: "" });
const orgs = ref([
  { name: "All", code: "" },
  { name: "UN", code: "un" },
  { name: "ADB", code: "adb" },
  { name: "IMF", code: "imf" },
  { name: "AMRO", code: "amro" },
  { name: "OECD", code: "oecd" },
  { name: "UNCTAD", code: "unctad" },
  { name: "WORLD BANK", code: "world_bank" },
  { name: "S&P GLOBAL", code: "snp_global" },
]);

const loadFiles = async () => {
  try {
    const res = await getFiles(route.params.category);
    data.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const filteredData = computed(() =>
  filterByFileName(data.value, selectedOrg.value.code),
);

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
    <Disclaimer
      content="Dokumen ini digunakan sebagai informasi, referensi, dan fenomena
      pendukung. Informasi dan opini yang disajikan bersumber dari berbagai
      pihak yang dianggap dapat dipercaya, namun tidak dijamin keakuratan maupun
      kelengkapannya."
    />
    <FloatLabel
      v-if="route.params.category === 'intl'"
      class="w-full"
      variant="in"
    >
      <Select
        v-model="selectedOrg"
        inputId="in_label"
        :options="orgs"
        optionLabel="name"
        class="w-full"
        variant="filled"
      />
      <label for="in_label">Organization</label>
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
