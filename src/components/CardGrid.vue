<script setup>
import { downloadRecentFileUrl } from "@/services/fileService";
import BaseCard from "./BaseCard.vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const handleClick = (item) => {
  const link = document.createElement("a");
  link.href = downloadRecentFileUrl(item.filePath);
  link.download = item.filename;
  link.click();
};
</script>

<template>
  <div class="py-4">
    <div
      class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <BaseCard
        v-for="item in items"
        :key="item.id"
        :filename="item.filename"
        :size="item.size"
        :date="item.date"
        :jenis-file="item.jenisFile"
        @click="handleClick(item)"
      />
    </div>
  </div>
</template>
