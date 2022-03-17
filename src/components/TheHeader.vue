<script setup>
import MainLogo from './MainLogo.vue';
  
</script>


<template>
  <header class="p-2 md:p-4 flex flex-row md:flex-col justify-between sticky top-0 md:static bg-white border-b md:border-none z-[100]">
    <MainLogo class="w-3/4 sm:w-2/3 md:w-1/2 h-auto md:m-auto" />
    <slot></slot>

  </header>
</template>