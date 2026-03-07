<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-3xl font-bold">Profile View</h1>
    <p>User: {{ $route.params.username }}</p>
    <p>
      Nama {{ $route.params.username }} merupakan params yang dikirim melalui
      router
    </p>
  </div>
</template>
