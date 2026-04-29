<script setup>
const props = defineProps({
  rotateArrow: {
    type: String,
    default: "",
  },
  widthArrow: {
    type: String,
    default: "w-10",
  },
});
</script>

<template>
  <div :class="['flex items-center', props.rotateArrow]">
    <div :class="['h-0.5 bg-[#ffbd59]', props.widthArrow]"></div>
    <div
      class="w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-[#ffbd59]"
    ></div>
  </div>
</template>
