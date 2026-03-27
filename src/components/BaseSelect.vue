<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: null,
  options: {
    type: Array,
    required: true,
  },
  optionLabel: {
    type: String,
    default: "name",
  },
  optionValue: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: "Select...",
  },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <Select
    v-model="model"
    :options="options"
    :optionLabel="optionLabel"
    :optionValue="optionValue"
    :placeholder="placeholder"
    class="w-full"
  />
</template>
