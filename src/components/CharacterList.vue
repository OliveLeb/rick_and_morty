<script setup>
import { computed } from 'vue'
import CharacterCard from './CharacterCard.vue'
import Pagination from '../components/Pagination.vue';

  const emit = defineEmits({
    changePage: null
  })

  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  })

  const characters = computed(() => {
    return props.data.residents ?? props.data.characters ?? props.data.results
  })

  const changePage = (val, type) => {
    emit('changePage', val, type)
  }


</script>


<template>
  <section>

    <div class="flex flex-wrap gap-6 justify-center">
      <TransitionGroup name="list">
        <CharacterCard v-for="character in characters" :key="character.id" :character="character"/>
      </TransitionGroup>
    </div>

  </section>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>