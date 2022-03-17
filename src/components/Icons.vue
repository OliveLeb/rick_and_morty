<script setup>
  defineProps({
    name: {
      type: String,
      required: true
    }
  })
</script>


<template>
  

  <svg  v-if="name==='prev'" width="1em" height="1em" viewBox="0 0 24 24">
    <path fill="currentColor" d="M17.77 3.77L16 2L6 12l10 10l1.77-1.77L9.54 12z"></path>
  </svg>

  <svg v-if="name==='next'" width="1em" height="1em" viewBox="0 0 24 24">
    <path fill="currentColor" d="M6.23 20.23L8 22l10-10L8 2L6.23 3.77L14.46 12z"></path>
  </svg>


</template>
