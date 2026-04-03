<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getFiles, downloadFileUrl, viewFileUrl } from "@/services/fileService";
import Disclaimer from "@/components/Disclaimer.vue";

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
  bca: {
    title: "BCA",
    desc: "Laporan ekonomi yang menyajikan gambaran terkini dan insight perekonomian dari ekonom Bank BCA.",
  },
  mandiri: {
    title: "Mandiri",
    desc: "Laporan ekonomi yang menyajikan gambaran terkini dan insight perekonomian dari ekonom Bank Mandiri.",
  },
  pefindo: {
    title: "Pefindo",
    desc: "Laporan ekonomi yang menyajikan gambaran terkini dan insight perekonomian dari Lembaga Pefindo (PT. Pemeringkat Efek Indonesia).",
  },
  kemenkeu: {
    title: "Kemenkeu",
    desc: "Laporan ekonomi yang menyajikan gambaran terkini, kinerja fiskal, dan arah kebijakan pemerintah.",
  },
  bi: {
    title: "Bank Indonesia",
    desc: "Laporan ekonomi yang menyajikan gambaran terkini, proyeksi, dan arah kebijakan moneter serta stabilitas keuangan.",
  },
  samuel: {
    title: "Samuel Sekuritas Indonesia",
    desc: "Laporan ekonomi yang menyajikan gambaran terkini dan insight perekonomian dari Lembaga Samuel Sekuritas Indonesia.",
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
      kelengkapannya, sehingga tidak dapat dijadikan sebagai dasar pengambilan
      keputusan."
    />
    <div class="flex flex-col gap-3">
      <DataTable
        :value="data"
        paginator
        :rows="10"
        responsiveLayout="stack"
        breakpoint="768px"
      >
        <Column field="file_name" header="FILE NAME"> </Column>
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
