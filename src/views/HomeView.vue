<script setup>
import { computed } from 'vue';
import { useGql } from '@/composables'
import SearchBar from '../components/SearchBar.vue';
import CharacterList from '../components/CharacterList.vue';
import FiltersBar from '../components/FiltersBar.vue';




const { fetchQuery, changePage, data } = useGql()


const title = computed(() => {
  if (data.value.__typename === 'Characters') return `All Characters`
  if (data.value.__typename === 'Location' ) return `Characters from ${data.value.name}`
  if (data.value.__typename === 'Episode' ) return `Characters from ${data.value.name} - ${data.value.episode}`
})

</script>

<template>

  <SearchBar @fetch-characters="fetchQuery" />


  <section v-if="data" class="py-8">

  <h2 class="text-3xl font bold text-center" v-if="data">{{ title }}</h2>

  <FiltersBar v-if="data?.__typename === 'Characters'" @filter-characters="fetchQuery"/>


    <Transition>
      <CharacterList :data="data" @change-page="changePage" />
    </Transition>


  </section>

</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>