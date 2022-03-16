<script setup>
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue';

</script>

<template>
<div class="flex flex-col min-h-screen">
  
  <TheHeader />

  <main class="flex-1 p-4">
    <RouterView />
  </main>
</div>
</template>