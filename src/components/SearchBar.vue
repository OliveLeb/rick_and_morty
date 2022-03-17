<script setup>
import { onMounted, ref, watch } from 'vue';
import { sortEpisodesPerSeason , objectOfArraysToArray } from '@/utils'
import { useGql } from '@/composables'
import SearchButton from './SearchButton.vue';
import SearchList from './SearchList.vue';
import BurgerMenu from './BurgerMenu.vue';


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

// Regroupe episodes per season every new page of episodes is called
watch(data, (val) => {
  displaySearchList.value = true
  if (!data.value?.results) return

  if (queryName.value == 'episodes') {
    if (Array.isArray(categories.value)) return categories.value = sortEpisodesPerSeason(val.results)
      
    const newCategoryArray = objectOfArraysToArray(categories.value)
    const arr = [...newCategoryArray, ...val.results]
    categories.value = sortEpisodesPerSeason(arr)
    return
  }
  categories.value = val.results

})

const launchQuery = (variables, next) => {
  displaySearchList.value = true
  next(variables)
}

const displaySearchList = ref(false)
const closeSearchList = () => displaySearchList.value = false


const openMobileMenu = ref(false)
const mobileMenuCanBeShown = ref(false)
const size = ref(0)
onMounted(() => {
  size.value = window.innerWidth
  window.addEventListener('resize', ()=> {
    size.value = window.innerWidth
  })
})
watch(size, () => {
  if (size.value >= 768) return mobileMenuCanBeShown.value = false
  return mobileMenuCanBeShown.value = true
})


</script>


<template>
  
  <nav class="md:py-4 flex md:justify-center">

    <ul class="gap-2 justify-center text-rm-blue hidden md:flex">
      <li>
        <!-- <SearchButton @click="fetchCharacters({type: 'charAll', variables: {page: 1}})" class="uppercase">Show them all !</SearchButton> -->
        <SearchButton @click="launchQuery({type: 'charAll', variables: {page: 1}}, fetchCharacters)" class="uppercase">Show them all !</SearchButton>
      </li>
      <li>
        <SearchButton @click="launchQuery({type:'locations', variables:{page: 1}}, fetchQuery)">Locations</SearchButton>
        <!-- <SearchButton @click="fetchQuery({type:'locations', variables:{page: 1}})">Locations</SearchButton> -->
      </li>
      <li>
        <SearchButton @click="launchQuery({type:'episodes', variables:{page: 1}}, fetchQuery)">Episodes</SearchButton>
        <!-- <SearchButton @click="fetchQuery({type:'episodes', variables:{page: 1}})">Episodes</SearchButton> -->
      </li>
    </ul>

    <BurgerMenu :open="openMobileMenu" @click="() => openMobileMenu = !openMobileMenu" class="md:hidden mt-auto"/>

  </nav>

  <div v-if="mobileMenuCanBeShown && openMobileMenu" class="fixed inset-0 top-28 bg-neutral-700/75 z-50"></div>

  <Transition name="menu-slide">
    <aside v-if="mobileMenuCanBeShown && openMobileMenu" class="fixed top-28 bottom-0 left-0 w-2/3 min-h-[300px] bg-white z-[100]">
      <ul class="flex flex-col gap-4 items-center pt-10">
        <li @click="fetchCharacters({type: 'charAll', variables: {page: 1}})">Show them all !</li>
        <li @click="fetchQuery({type:'locations', variables:{page: 1}})">Locations</li>
        <li @click="fetchQuery({type:'episodes', variables:{page: 1}})">Episodes</li>
      </ul>
    </aside>
  </Transition>

  <Transition>  
    <SearchList v-if="data && displaySearchList" :info="data.info" :categories="categories" :queryName="queryName"
      @change-page="changePage"
      @fetch-characters="fetchCharacters"
      @close-search="closeSearchList"
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

.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.5s ease;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>