<script setup>
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import { uploadFile } from "@/services/fileService";
import { categoryContent } from "@/constants/categoryContent";

const toast = useToast();

const selectedCategory = ref(null);

const category = ref(
  Object.entries(categoryContent).map(([code, value]) => ({
    name: value.title,
    code: code,
  })),
);

const date = ref();
const formattedDate = computed(() => {
  if (!date.value) return "";

  const d = date.value;

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}${month}${year}`;
});

const progress = ref(0);
const response = ref(null);
const error = ref(null);

const handleFileChange = (e) => {
  file.value = e.target.files[0];
};

/**
 * state
 */
const fileUploadRef = ref(null);
const uploadKey = ref(0);
const loading = ref(false);

/**
 * reset uploader total
 */
const resetUploader = () => {
  if (fileUploadRef.value) {
    fileUploadRef.value.clear();
  }

  // recreate component (anti bug file same name)
  uploadKey.value++;
};

const upload = async (event) => {
  response.value = null;
  error.value = null;

  const file = event.files?.[0];

  if (!file) {
    toast.add({
      severity: "warn",
      summary: "Warning",
      detail: "Pilih file terlebih dahulu",
      life: 3000,
    });
    return;
  }

  loading.value = true;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("jenis_file", selectedCategory.value.code);
  formData.append("tanggal_rilis", formattedDate.value);

  try {
    const res = await uploadFile(formData, (percent) => {
      progress.value = percent;
    });

    response.value = res.data;

    toast.add({
      severity: "success",
      summary: "Berhasil",
      detail: "Upload berhasil",
      life: 3000,
    });

    resetUploader();
    error.value = null;
  } catch (err) {
    // error.value = err.response?.data?.detail || "Upload gagal";
    toast.add({
      severity: "error",
      summary: "Gagal",
      detail:
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Upload gagal",
      life: 4000,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="app-container">
    <Toast />

    <h1>Upload File</h1>

    <div class="flex flex-col gap-2">
      <label class="font-medium">Jenis File</label>
      <Select
        v-model="selectedCategory"
        inputId="on_label"
        :options="category"
        optionLabel="name"
        class="w-full"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label class="font-medium">Tanggal Rilis</label>
      <DatePicker v-model="date" dateFormat="dd/mm/yy" />
    </div>

    <FileUpload
      :key="uploadKey"
      ref="fileUploadRef"
      mode="advanced"
      name="file"
      accept=".xlsx,.xls,.pdf,.doc,.docx,.ppt,.pptx"
      :multiple="false"
      :fileLimit="1"
      customUpload
      :auto="false"
      @uploader="upload"
      chooseLabel="Pilih File"
      uploadLabel="Upload"
      cancelLabel="Batal"
      :disabled="loading"
    >
      <template #empty>
        <div class="flex flex-col items-center justify-center py-8">
          <i
            class="pi pi-cloud-upload text-5xl text-surface-400 border rounded-full p-6"
          />
          <p class="mt-4 text-sm text-surface-500">Drag & drop file ke sini</p>
          <p class="text-xs text-surface-400 mt-1">
            Excel / PDF / Word / PowerPoint
          </p>
        </div>
      </template>
    </FileUpload>

    <!-- <div class="flex flex-col gap-2">
      <label class="block mb-1 font-medium">Pilih File</label>
      <input
        type="file"
        @change="handleFileChange"
        class="w-full border rounded-lg px-3 py-2"
      />
    </div> -->

    <!-- <div v-if="progress > 0 && !error" class="flex flex-col gap-1">
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-blue-500 h-2 rounded-full"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
      <p class="text-sm">{{ progress }}%</p>
    </div> -->

    <ProgressBar v-if="progress > 0 && !error" :value="progress" />

    <!-- Button -->
    <!-- <Button label="Upload" @click="upload" /> -->

    <div v-if="response" class="flex flex-col gap-4">
      <div>
        <p><strong>Filename:</strong> {{ response.filename }}</p>
        <p><strong>Path:</strong> {{ response.file_path }}</p>
        <p><strong>Jenis File:</strong> {{ response.jenis_file }}</p>
        <p><strong>Size:</strong> {{ response.size }} bytes</p>
      </div>
      <div class="p-3 bg-green-500 rounded">Upload berhasil</div>
    </div>

    <div v-if="error" class="p-3 bg-red-500 rounded">
      {{ error }}
    </div>
  </div>
</template>
