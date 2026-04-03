<script setup>
const props = defineProps({
  content: String,
});
</script>

<template>
  <div
    class="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800"
  >
    <i class="pi pi-exclamation-triangle" style="font-size: 1.5rem"></i>
    <p>
      <span class="font-semibold">Disclaimer:</span>
      {{ content }}
    </p>
  </div>
</template>
