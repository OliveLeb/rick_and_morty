<script setup>
import { computed } from 'vue'
import CharacterCard from './CharacterCard.vue'

  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  })

  const characters = computed(() => {
    return props.data.residents ?? props.data.characters
  })

</script>


<template>
  <section class="py-10">
    <h2 class="text-3xl font bold text-center mb-10">Characters from {{ data.name }} <span v-if="data.episode">- {{data.episode}}</span></h2>

    <div class="flex flex-wrap gap-6 justify-center">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character"/>
    </div>

  </section>
</template>