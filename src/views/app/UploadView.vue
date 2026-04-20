<script setup>
import { ref, computed } from "vue";
import { uploadFile } from "@/services/fileService";
import { categoryContent } from "@/constants/categoryContent";

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

const file = ref(null);
const progress = ref(0);
const response = ref(null);
const error = ref(null);

const handleFileChange = (e) => {
  file.value = e.target.files[0];
};

const upload = async () => {
  response.value = null;
  error.value = null;

  const formData = new FormData();
  formData.append("file", file.value);
  formData.append("jenis_file", selectedCategory.value.code);
  formData.append("tanggal_rilis", formattedDate.value);

  try {
    const res = await uploadFile(formData, (percent) => {
      progress.value = percent;
    });

    response.value = res.data;
    error.value = false;
  } catch (err) {
    error.value = err.response?.data?.detail || "Upload gagal";
  }
};
</script>

<template>
  <div class="flex flex-col gap-3 max-w-xl mx-auto p-6 rounded-2xl shadow">
    <h2 class="text-xl font-bold mb-4">Upload File</h2>

    <FloatLabel class="w-full md:w-56" variant="on">
      <Select
        v-model="selectedCategory"
        inputId="on_label"
        :options="category"
        optionLabel="name"
        class="w-full"
      />
      <label for="on_label">Kategori</label>
    </FloatLabel>

    <label class="block mb-1 font-medium">Tanggal Rilis</label>
    <DatePicker v-model="date" dateFormat="dd/mm/yy" />

    <div class="mb-4">
      <label class="block mb-1 font-medium">Pilih File</label>
      <input
        type="file"
        @change="handleFileChange"
        class="w-full border rounded-lg px-3 py-2"
      />
    </div>

    <div v-if="progress > 0 && !error" class="mb-4">
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-blue-500 h-2 rounded-full"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
      <p class="text-sm mt-1">{{ progress }}%</p>
    </div>

    <!-- Button -->
    <button
      @click="upload"
      class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    >
      Upload
    </button>

    <div v-if="response" class="mt-4 p-3 rounded">
      <p><strong>Filename:</strong> {{ response.filename }}</p>
      <p><strong>Path:</strong> {{ response.file_path }}</p>
      <p><strong>Jenis:</strong> {{ response.jenis_file }}</p>
      <p><strong>Size:</strong> {{ response.size }} bytes</p>
      <!-- Success -->
      <div class="mt-4 p-3 bg-green-500 rounded">Upload berhasil</div>
    </div>

    <div v-if="error" class="mt-4 p-3 bg-red-500 rounded">
      {{ error }}
    </div>
  </div>
</template>
