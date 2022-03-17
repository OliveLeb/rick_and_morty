<script setup>
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

</script>

<template>
<div class="flex flex-col min-h-screen">
  
  <TheHeader />

  <main class="flex-1 p-4 w-full max-w-screen-lg m-auto">
    <RouterView />
  </main>

  <TheFooter />
</div>
</template>