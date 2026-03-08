<template>
  <div class="app-container">
    <h1>Profile View</h1>
    <p>User: {{ $route.params.username }}</p>
    <p>
      Nama {{ $route.params.username }} merupakan params yang dikirim melalui
      router
    </p>
  </div>
</template>
