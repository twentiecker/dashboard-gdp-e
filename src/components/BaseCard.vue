<script setup>
import { getFileType } from "@/utils/fileType";

const props = defineProps({
  filename: String,
  size: String,
  date: String,
  jenisFile: String,
});

const emit = defineEmits(["click"]);
</script>

<template>
  <Card class="h-full flex flex-col justify-between">
    <template #header>
      <Tag
        class="absolute"
        severity="contrast"
        :value="jenisFile"
        :pt="{
          label: {
            class: '!text-[0.7rem]',
          },
        }"
        ><img
          :src="`/icons/${getFileType(filename)}.png`"
          :alt="getFileType(filename)"
          class="w-8"
      /></Tag>
      <img src="/logo-file.png" alt="card image" class="rounded-t-xl" />
    </template>

    <template #title>
      <Tag
        icon="pi pi-building"
        severity="info"
        :value="jenisFile"
        :pt="{
          icon: {
            class: '!text-[0.7rem]',
          },
          label: {
            class: '!text-[0.7rem]',
          },
        }"
      ></Tag>
      <div class="truncate">
        {{ filename }}
      </div>
    </template>

    <template #content>
      <p class="text-sm text-gray-600">
        {{ size }}
      </p>
      <p class="text-sm text-gray-600">
        {{ date }}
      </p>
    </template>

    <template #footer>
      <Button
        label="Download"
        icon="pi pi-download"
        class="w-full"
        :pt="{
          root: {
            class: '!bg-[#004aad] !border-0 !text-white',
          },
        }"
        size="small"
        severity="contrast"
        @click="emit('click')"
      />
    </template>
  </Card>
</template>
