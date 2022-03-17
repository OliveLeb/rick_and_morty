<script setup>
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_ALL_CHARACTERS, GET_CHARACTERS_BY_LOCATION, GET_CHARACTERS_BY_EPISODE } from '@/apollo/queries'
import { markRaw, computed } from 'vue';
import { useGql } from '@/composables'
import SearchBar from '../components/SearchBar.vue';
import CharacterList from '../components/CharacterList.vue';



const queries = markRaw({
  charLocation: GET_CHARACTERS_BY_LOCATION,
  charEpisode: GET_CHARACTERS_BY_EPISODE,
  charAll: GET_ALL_CHARACTERS
})

const { variables, enable, queryName, fetchQuery, changePage } = useGql()

const gqlQuery = computed(() => queryName.value && queries[queryName.value])


const { result, onError, onResult } = useQuery(
  gqlQuery,
  variables,
  () => ({ enabled: enable.value})
)

onError(error => {
  console.log(error.graphQLErrors)
  console.log(error.networkError)
})

const data = useResult(result)

onResult(queryResult => {
  if (!queryResult.loading){ 
    enable.value = false
  }
})

</script>

<template>

  <SearchBar @fetch-characters="fetchQuery" />

  <section v-if="data">
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