<script setup>
import { ref, watch } from 'vue';
import { sortEpisodesPerSeason , objectOfArraysToArray } from '@/utils'
import { useGql } from '@/composables'
import SearchButton from './SearchButton.vue';
import SearchList from './SearchList.vue';


const emit = defineEmits({
  fetchCharacters: ({ type, variables }) => {
    if (type && variables) return true
    return false
  }
})

const fetchCharacters = ({ type, variables }) => {
  if (type === 'charAll') displaySearchList.value = false
  emit('fetchCharacters', { type, variables })
}



const { data, queryName, fetchQuery, changePage } = useGql()

const categories = ref([])

const displaySearchList = ref(false)

watch(data, (val) => {
  displaySearchList.value = true
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


</script>


<template>
  
  <nav class="py-4">

    <ul class="flex gap-2 justify-center text-rm-blue">
      <li>
        <SearchButton @click="fetchCharacters({type: 'charAll', variables: {page: 1}})" class="uppercase">Show them all !</SearchButton>
      </li>
      <li>
        <SearchButton @click="fetchQuery({type:'locations', variables:{page: 1}})">Locations</SearchButton>
      </li>
      <li>
        <SearchButton @click="fetchQuery({type:'episodes', variables:{page: 1}})">Episodes</SearchButton>
      </li>
    </ul>

  </nav>

  <Transition>  
    <SearchList v-if="data && displaySearchList" :info="data.info" :categories="categories" :queryName="queryName"
      @change-page="changePage"
      @fetch-characters="fetchCharacters"
      class="my-4 text-sm border rounded p-2"
    />
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