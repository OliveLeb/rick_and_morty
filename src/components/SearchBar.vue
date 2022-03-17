<script setup>
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_EPISODES, GET_LOCATIONS } from '@/apollo/queries'
import { ref, markRaw, computed, watch } from 'vue';
import { sortEpisodesPerSeason , objectOfArraysToArray } from '@/utils'
import { useGql } from '@/composables'
import Icons from './Icons.vue';


const queries = markRaw({
  locations: GET_LOCATIONS,
  episodes: GET_EPISODES
})

const { variables, enable, queryName, fetchQuery, changePage } = useGql({page: 1})

const gqlQuery = computed(() => queryName.value && queries[queryName.value])


const { result, onError, onResult } = useQuery(
  gqlQuery,
  variables,
  () => ({ enabled: enable.value})
)

const data = useResult(result)

const categories = ref([])

watch(data, (val) => {
  if (data.value?.results) {

    if (queryName.value == 'episodes') {
      if (Array.isArray(categories.value)) return categories.value = sortEpisodesPerSeason(val.results)
        const newCategoryArray = objectOfArraysToArray(categories.value)

        const arr = [...newCategoryArray, ...val.results]

        categories.value = sortEpisodesPerSeason(arr)
        return
    }

    categories.value = val.results
  }
})

onError(error => {
  console.log(error.graphQLErrors)
  console.log(error.networkError)
})


onResult(queryResult => {
  if (!queryResult.loading){ 
    enable.value = false
  }
})


</script>


<template>
  
  <nav class="py-4">

    <ul class="flex gap-2 text-rm-blue">
      <li>
        <button @click="fetchQuery('locations')" class="bg-rm-green p-2 font-bold">Locations</button>
      </li>
      <li>
        <button @click="fetchQuery('episodes')" class="bg-rm-green p-2 font-bold">Episodes</button>
      </li>
    </ul>

  </nav>

<Transition>  
  <aside v-if="data" >
    <div class="flex flex-wrap gap-2">

      <template v-if="queryName === 'locations' ">

        <div v-for="el in categories" :key="el.id" >
          <button @click="fetchCharacters(el.id)" class="border rounded border-gray-300 p-2 hover:bg-rm-blue hover:text-white">
            {{ el.name }}
          </button>
        </div>

        <div>
          <button v-if="data.info.prev" @click="changePage(-1)"><Icons name="prev" /></button>
          <button v-if="data.info.next" @click="changePage(1)"><Icons name="next" /></button>
        </div>
      </template>

      <template v-if="queryName === 'episodes' ">
      <div>
        <div v-for="(episodes, season, index) in categories" :key="season" class="flex gap-4 mb-4">
          <div class="p-2 border-b rounded">{{ season }}: </div>
          <button v-for="episode in episodes" :key="episode.id" class="border rounded border-gray-300 p-2 hover:bg-rm-blue hover:text-white items-center">
            {{ episode.episode.slice(3) }}
          </button>
          <button class="self-end" 
            v-if="Object.keys(categories).length -1 == index && data.info.next" 
            @click="changePage(1)"
          >
            load more...
          </button>
        </div>
      </div>

      </template>


    </div>

  </aside>
</Transition>

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