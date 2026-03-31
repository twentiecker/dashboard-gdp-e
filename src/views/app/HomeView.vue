<template>
  <div class="flex flex-col">
    <Image
      src="/banner.png"
      alt="Image"
      :pt="{
        image: {
          class: 'w-full h-[calc(100vh-var(--navbar-height))] object-cover',
        },
      }"
    />
  </div>
</template>
