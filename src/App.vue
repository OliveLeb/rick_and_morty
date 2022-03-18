<script setup>
import { computed } from 'vue';
import { useGql } from '@/composables'

import SearchNav from './components/SearchNav.vue';
import CharacterList from './components/CharacterList.vue';
import FiltersNav from './components/FiltersNav.vue';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import Pagination from './components/Pagination.vue';

const { fetchQuery, changePage, data, loading, error } = useGql()

const title = computed(() => {
  if (data.value?.__typename === 'Characters') return `All Characters`
  if (data.value?.__typename === 'Location' ) return `Characters from ${data.value.name}`
  if (data.value?.__typename === 'Episode' ) return `Characters from ${data.value.name} - ${data.value.episode}`
})

const characters = computed(() => {
  return data.value.characters ?? data.value.residents ?? data.value.results
})

</script>

<template>
<div class="flex flex-col min-h-screen">
  
  <TheHeader>
    <SearchNav @fetch-characters="fetchQuery" />
  </TheHeader>


  <main class="flex-1 p-2 sm:pt-6 sm:pb-10 w-full max-w-screen-xl m-auto pb-6">

    <section v-if="loading">
      <h1 class="text-xl sm:text-3xl text-center font-bold mb-6">Loading...</h1>
    </section>

    <section v-else-if="error">
      <h1 class="text-xl sm:text-3xl text-center font-bold mb-6">Oups, an error occured</h1>
      <p class="text-red-500">{{ error.message }}</p>
    </section>

    <section v-else-if="!data">
      <h1 class="text-xl sm:text-3xl text-center font-bold mb-6">Welcome</h1>

      <p>You can search for Rick and Morty's characters here! Enjoy!</p>

    </section>

    <section v-else-if="!characters">
      <h1 class="text-xl sm:text-3xl text-center font-bold mb-6">Oups, no matching data 😣</h1>
    </section>

    <section v-else-if="characters">
      <h1 class="text-xl sm:text-3xl font bold text-center mb-6" v-if="data">{{ title }}</h1>

      

        <div>
          <Pagination v-if="data.info" :prev="data.info.prev" :next="data.info.next" :totalPages="data.info.pages"
            @change-page="changePage"
            class="mb-2"
          />

          <div class="flex flex-col md:flex-row">
            <FiltersNav v-if="data?.__typename === 'Characters'" @filter-characters="fetchQuery" class="w-full mb-4 md:w-1/4"/>
            
            <Transition>
              <CharacterList :data="data" @change-page="changePage" class="w-full md:w-3/4 m-auto"/>
            </Transition>
          </div>

          <Pagination v-if="data.info" :prev="data.info.prev" :next="data.info.next" :totalPages="data.info.pages"
            @change-page="changePage"
            class="mb-6 mt-4"
          />
      </div>
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