<script setup>
import { computed, ref, toRaw } from 'vue';
import Pagination from './Pagination.vue';

  const emit = defineEmits({
    fetchCharacters: null,
    changePage: null
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

  // Handle episodes pagination
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

  const isLastPage = computed(() => {
    if (!props.info.next) return true
    return false
  })

  const changePage = (val, type) => {
    if (props.queryName === 'episodes') {
      if (isLastPage.value) {
        show.value += 2
        return
      }
    }
    emit('changePage', val, type)
  }

  const viewLess = () => {
    show.value -= 2
  }


</script>


<template>
  <aside>

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

        <Pagination :prev="info.prev" :next="info.next" :totalPages="info.pages" @change-page="changePage"/>


      </template>


      <template v-if="queryName === 'episodes' ">
        <div class="flex flex-col">
          <div v-for="(episodes, season) in cat" :key="season" class="flex gap-2 mb-4">

              <div class="p-1 border-b rounded mr-1">{{ season }}: </div>
                <button v-for="episode in episodes" :key="episode.id"
                @click="$emit('fetchCharacters', {type:'charEpisode', variables: {episodeId: episode.id }})"
                class="border rounded border-gray-300 p-1 hover:bg-rm-blue hover:text-white items-center"
              >
                {{ episode.episode.slice(3) }}
              </button>
          </div>
        
          <div class="flex justify-end gap-4">
            <button class="text-rm-blue font-bold hover:underline decoration-dotted underline-offset-2"
              v-if="!isAllFetched" 
              @click="changePage(1)"
            >
              Load more...
            </button>

            <button @click="viewLess"
            v-if="info.prev && Object.keys(cat).length > 2"
            class="text-rm-blue font-bold hover:underline decoration-dotted underline-offset-2"
             >
             View less...
            </button>
          </div>

        </div>
      </template>

  </aside>
</template>