<script setup>
import ComboChart from "./components/ComboChart.vue";
</script>

<template>
  <div class="flex flex-col gap-5 p-10">
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem explicabo
      perferendis recusandae quod nostrum reprehenderit pariatur libero quas
      alias porro expedita enim ipsa facere, dolores voluptatum distinctio
      aliquid earum corrupti quam corporis doloribus cumque? Dignissimos, illo
      quis. Maxime iste, rem obcaecati in dolorem adipisci et fuga voluptatum
      quaerat? Iste, pariatur? Dicta ex harum quasi?
    </p>
    <Button label="Button" icon="pi pi-check" />
    <div class="flex flex-col gap-12">
      <div class="flex gap-6 flex-wrap">
        <div
          class="rounded-border p-4 border border-transparent flex items-center justify-center bg-primary hover:bg-primary-emphasis text-primary-contrast font-medium flex-auto transition-colors"
        >
          primary
        </div>
        <div
          class="rounded-border p-4 border border-transparent flex items-center justify-center bg-highlight hover:bg-highlight-emphasis font-medium flex-auto transition-colors"
        >
          highlight
        </div>
        <div
          class="rounded-border p-4 border border-surface flex items-center justify-center text-muted-color hover:text-color hover:bg-emphasis font-medium flex-auto transition-colors"
        >
          box
        </div>
      </div>
    </div>
    <div>
      <ComboChart />
    </div>
    <div
      class="flex items-center justify-center border-1 rounded-lg p-4 gap-10"
    >
      <i class="pi pi-check"></i>
      <i class="pi pi-times"></i>
      <span class="pi pi-search"></span>
      <span class="pi pi-user"></span>
    </div>
  </div>
</template>
