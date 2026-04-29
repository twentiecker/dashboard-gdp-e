<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { uploadMonitoringExcel } from "@/services/monitorService";
import { useAuthStore } from "@/stores/auth";

const toast = useToast();
const auth = useAuthStore();

const progress = ref(0);
const response = ref(null);
const error = ref(null);

/**
 * state
 */
const fileUploadRef = ref(null);
const uploadKey = ref(0);
const loading = ref(false);
const uploadedBy = ref(auth.user.email);

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

/**
 * upload handler
 */
const upload = async (event) => {
  response.value = null;
  error.value = null;

  try {
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

    const res = await uploadMonitoringExcel({
      file,
      uploaded_by: uploadedBy.value,
      onProgress: (percent) => {
        progress.value = percent;
      },
    });
    console.log(res);

    response.value = res;

    toast.add({
      severity: "success",
      summary: "Berhasil",
      detail:
        `${res.message} (${res.rows_processed} baris)` || "Upload berhasil",
      life: 3000,
    });

    resetUploader();
    error.value = null;
  } catch (err) {
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

    <h1>Upload Monitoring</h1>

    <!-- Input Uploaded By -->
    <div class="flex flex-col gap-2">
      <label class="font-semibold">Uploaded By</label>
      <InputText
        disabled
        v-model="uploadedBy"
        placeholder="Masukkan nama uploader"
        class="w-full"
      />
    </div>

    <!-- Upload -->
    <FileUpload
      :key="uploadKey"
      ref="fileUploadRef"
      mode="advanced"
      name="file"
      accept=".xlsx,.xls"
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

    <div
      v-if="loading"
      class="mt-4 text-sm text-blue-500 font-medium flex items-center gap-2"
    >
      <i class="pi pi-spin pi-spinner" />
      Sedang upload file...
    </div>

    <ProgressBar v-if="progress > 0 && !error" :value="progress" />

    <!-- <div v-if="progress > 0 && !error" class="flex flex-col gap-1">
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-blue-500 h-2 rounded-full"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
      <p class="text-sm">{{ progress }}%</p>
    </div> -->

    <div v-if="response" class="flex flex-col gap-4">
      <div>
        <p><strong>Filename:</strong> {{ response.filename }}</p>
        <p><strong>Records:</strong> {{ response.rows_processed }} record</p>
      </div>
      <!-- Success -->
      <div class="p-3 bg-green-500 rounded">Upload berhasil</div>
    </div>

    <div v-if="error" class="p-3 bg-red-500 rounded">
      {{ error }}
    </div>
  </div>
</template>
