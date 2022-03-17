<script setup>
import { computed } from 'vue';
import { useGql } from '@/composables'

import SearchBar from './components/SearchBar.vue';
import CharacterList from './components/CharacterList.vue';
import FiltersBar from './components/FiltersBar.vue';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

const { fetchQuery, changePage, data, loading, error } = useGql()

const title = computed(() => {
  if (data.value.__typename === 'Characters') return `All Characters`
  if (data.value.__typename === 'Location' ) return `Characters from ${data.value.name}`
  if (data.value.__typename === 'Episode' ) return `Characters from ${data.value.name} - ${data.value.episode}`
})

</script>

<template>
<div class="flex flex-col min-h-screen">
  
  <TheHeader>
    <SearchBar @fetch-characters="fetchQuery" />
  </TheHeader>


  <main class="flex-1 p-2 md:p-4 w-full max-w-screen-lg m-auto">

    <section v-if="loading">
      <h1 class="text-3xl text-center font-bold mb-6">Loading...</h1>
    </section>

    <section v-else-if="error">
      <h1 class="text-3xl text-center font-bold mb-6">Oups, an error occured</h1>
      <p class="text-red-500">{{ error.message }}</p>
    </section>

    <section v-else-if="!data">
      <h1 class="text-3xl text-center font-bold mb-6">Welcome</h1>

      <p>You can search for Rick and Morty's characters here! Enjoy!</p>

    </section>

    <section v-else-if="!data.results">
      <h1 class="text-3xl text-center font-bold mb-6">Oups, no matching data 😣</h1>
    </section>

    <section v-else-if="data">

      <h1 class="text-3xl font bold text-center" v-if="data">{{ title }}</h1>

      <FiltersBar v-if="data?.__typename === 'Characters'" @filter-characters="fetchQuery"/>

      <Transition>
        <CharacterList :data="data" @change-page="changePage" />
      </Transition>

    </section>

  </main>

  <TheFooter />
</div>
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