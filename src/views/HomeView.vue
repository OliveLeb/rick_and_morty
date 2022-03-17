<script setup>
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_ALL_CHARACTERS, GET_CHARACTERS_BY_LOCATION, GET_CHARACTERS_BY_EPISODE } from '@/apollo/queries'
import { ref, markRaw, computed, watch } from 'vue';
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



</script>

<template>

  <SearchBar @fetch-characters="fetchQuery" />

  <section>

    <CharacterList v-if="data" :data="data" />

  </section>

</template>
