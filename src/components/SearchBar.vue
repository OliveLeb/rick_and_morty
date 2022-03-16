<script setup>
import { useQuery } from '@vue/apollo-composable'
import { GET_EPISODES } from '@/apollo/queries'
import { ref, markRaw, computed } from 'vue';


const query = ref()

const queries = markRaw({
  locations: null,
  episodes: GET_EPISODES
})

const gqlQuery = computed(() => query.value && queries[query.value])

const enable = ref(false)

const variables = ref({
  page: 1
})

const { result, onError, onResult } = useQuery(
  gqlQuery,
  variables,
  () => ({ enabled: enable.value})
)

const displayInfo = (e) => {
  if (e == 'locations') query.value = e
  if (e == 'episodes') query.value = e
  enable.value = true
}

onError(error => {
  console.log(error.graphQLErrors)
  console.log(error.networkError)
})


onResult(queryResult => {
  if (!queryResult.loading) enable.value = false
})

</script>


<template>
  
  <nav class="py-4">

    <ul class="flex gap-2">
      <li>
        <button @click="displayInfo('locations')">Locations</button>
      </li>
      <li>
        <button @click="displayInfo('episodes')">Episodes</button>
      </li>
    </ul>

  </nav>

  <aside v-if="result">

  

  </aside>

</template>