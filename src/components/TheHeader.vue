<script setup>
import MainLogo from './MainLogo.vue';
  
</script>


<template>
  <header class="p-4 sm:p-4 flex flex-row sm:flex-col justify-between top-0 sticky sm:static bg-white border-b sm:border-none z-[100]">
    <MainLogo class="w-64 md:w-1/2 h-auto sm:m-auto" />
    <slot></slot>

  </header>
</template>