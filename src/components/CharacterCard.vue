<script setup>
  defineProps({
    character: {
      type: Object,
      required: true
    }
  })
</script>


<template>

  <article class="rounded-lg overflow-hidden">
    <figure class="w-48">
        <img :src="character.image" alt="">
      <figcaption class="text-center">
        {{ character.name }}
      </figcaption>
    </figure>
  </article>

</template>