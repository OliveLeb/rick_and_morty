<script setup>
import { useQuery, useResult } from '@vue/apollo-composable'
import { GET_EPISODES, GET_LOCATIONS } from '@/apollo/queries'
import { ref, markRaw, computed, watch, toRaw, unref, isRef } from 'vue';
import { isArray } from '@vue/shared';
import Icons from './Icons.vue';


const query = ref()

const queries = markRaw({
  locations: GET_LOCATIONS,
  episodes: GET_EPISODES
})

const gqlQuery = computed(() => query.value && queries[query.value])

const enable = ref(false)

const variables = ref({
  page: 1
})

const displayInfo = (e) => {
  if (e == 'locations') query.value = e
  if (e == 'episodes') query.value = e
  enable.value = true
}

const fetchNextPage = () => {
  variables.value.page += 1
  enable.value = true
}

const { result, onError, onResult } = useQuery(
  gqlQuery,
  variables,
  () => ({ enabled: enable.value})
)

const data = useResult(result)

const categories = ref([])

watch(data, (val) => {
  if (data.value?.results) {

    if (query.value == 'episodes') {
      if (isArray(categories.value)) return categories.value = sortEpisodesPerSeason(val.results)

        const unrefetCat = objectOfArraysToArray(categories.value)

        const arr = [...unrefetCat, ...val.results]

        categories.value = sortEpisodesPerSeason(arr)
        return
    }

    // categories.value = categories.value.concat(val.results)
    categories.value = val.results
  }
})

onError(error => {
  console.log(error.graphQLErrors)
  console.log(error.networkError)
})

const objectOfArraysToArray = () => {
  return Object.values(object).map(key => toRaw(key)).flat(1)
}

const sortEpisodesPerSeason = (array) => {
  return array.reduce((acc, obj) => {
    var cle = obj['episode'].slice(0, 3)
    if (!acc[cle]) acc[cle] = []
    acc[cle].push(obj)
    return acc
  }, {})
}


onResult(queryResult => {
  if (!queryResult.loading){ 
    enable.value = false
  }
})

const moveToPage = (val) => {
  variables.value.page += val
  enable.value = true
}


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

<Transition>  
  <aside v-if="data" >
    <div class="flex flex-wrap gap-2">

      <template v-if="query === 'locations' ">
        <div v-for="(el, index) in categories" :key="el.id" >
          <button @click="fetchCharacters(el.id)" class="border rounded border-gray-300 p-2 hover:bg-rm-blue hover:text-white">
            {{ el.name }}
          </button>
          <!-- <button class="self-end" v-if="Object.keys(categories).length -1 == index" @click="fetchNextPage">load more...</button> -->
        </div>

        <div>
          <button v-if="data.info.prev" @click="moveToPage(-1)"><Icons name="prev" /></button>
          <button v-if="data.info.next" @click="moveToPage(1)"><Icons name="next" /></button>
        </div>
      </template>

      <template v-if="query === 'episodes' ">

      <div>
        <div v-for="(episodes, season, index) in categories" :key="season" class="flex gap-4 mb-4">
          <div class="p-2 border-b rounded">{{ season }}: </div>
          <button v-for="episode in episodes" :key="episode.id" class="border rounded border-gray-300 p-2 hover:bg-rm-blue hover:text-white items-center">
            {{ episode.episode.slice(3) }}
          </button>
          <button class="self-end" v-if="Object.keys(categories).length -1 == index" @click="fetchNextPage">load more...</button>
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