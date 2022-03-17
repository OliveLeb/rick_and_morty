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
  <section>
    <h2>Characters from {{ data.name }}</h2>

    <div class="flex flex-wrap gap-6 justify-center">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character"/>
    </div>

  </section>
</template>