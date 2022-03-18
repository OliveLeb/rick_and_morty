<script setup>
import { computed, ref } from 'vue';
import Pagination from './Pagination.vue';

  const emit = defineEmits({
    fetchCharacters: null,
    changePage: null,
    closeSearch: null
  })

  const props = defineProps({
    info: {
      type: Object,
    },
    categories: Array | Object,
    queryName: {
      type: String
    }
  })

  const show = ref(0)

  /*
  * Handle episodes pagination
  * if not episodes object return props categories
  * if show >= 0 return props categories (it means )
  */
  const cat = computed(() => {
    if (props.queryName !== 'episodes') return props.categories
    if (show.value >= 0) return props.categories

    return Object.keys(props.categories).slice(0, show.value).reduce((res, key) => {
      res[key] = props.categories[key]
      return res
    }, {})
  })


  const isAllFetched = computed(() => {
    if (!props.info.next) {
      if (Object.values(props.categories).length <= Object.values(cat.value).length) return true
    }
    return false
  })

  const loadMore = (val, type) => {
    // if query episodes and no more page to fetch, extend episodes array with 2 more row contained in props.categories
    // props.categories is not mutated because it comes from the parent whose not rerendered
    if (props.queryName === 'episodes' && !props.info.next) return show.value += 2
    // if pages still remain to fetch, emit the query
    emit('changePage', val, type)
  }

  const viewLessEpisodes = () => {
    show.value -= 2
  }


</script>


<template>
  <aside class="relative">
      <template v-if="queryName === 'locations' ">
        <div class="flex flex-wrap gap-2 mb-4 justify-center">
          <div v-for="el in cat" :key="el.id" >
            <button @click="$emit('fetchCharacters', {type:'charLocation', variables: {locationId: el.id }})"
              class="border rounded border-gray-300 p-1 hover:bg-rm-blue hover:text-white"
            >
              {{ el.name }}
            </button>
          </div>
        </div>

        <Pagination :prev="info.prev" :next="info.next" :totalPages="info.pages" @change-page="loadMore"/>
      </template>


      <template v-if="queryName === 'episodes' ">
        <div class="flex flex-col">

          <div v-for="(episodes, season) in cat" :key="season" class="flex gap-2 mb-4">
              <div class="p-1 border-b rounded mr-1">{{ season }}: </div>
              <div class="flex gap-2 flex-wrap">
                <button v-for="episode in episodes" :key="episode.id"
                  @click="$emit('fetchCharacters', {type:'charEpisode', variables: {episodeId: episode.id }})"
                  class="border rounded border-gray-300 p-1 hover:bg-rm-blue hover:text-white items-center"
                >
                  {{ episode.episode.slice(3) }}
                </button>
              </div>
          </div>
        
          <div class="flex justify-end gap-4">
            <button class="text-rm-blue font-bold hover:underline decoration-dotted underline-offset-2"
              v-if="!isAllFetched" 
              @click="loadMore(1)"
            >
              Load more...
            </button>

            <button @click="viewLessEpisodes"
            v-if="info.prev && Object.keys(cat).length > 2"
            class="text-rm-blue font-bold hover:underline decoration-dotted underline-offset-2"
             >
             View less...
            </button>
          </div>

        </div>
      </template>

      <button class="absolute top-0 right-2" @click="$emit('closeSearch')">X</button>

  </aside>
</template>