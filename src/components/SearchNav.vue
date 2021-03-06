<script setup>
import { onBeforeMount, onMounted, ref, watch } from 'vue';
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
  if (type === 'all') displaySearchList.value = false
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

  const urlParams = new URLSearchParams(window.location.search)
  if(urlParams.get('categories') === variables.type && queryName.value === variables.type) return
  urlParams.set('categories', variables.type)
  history.replaceState(null, null, '?'+urlParams.toString());

  next(variables)
}

const displaySearchList = ref(false)

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
  if (size.value >= 640) {
    mobileMenuCanBeShown.value = false
    openMobileMenu.value = false
    return
  }
  return mobileMenuCanBeShown.value = true
})

const closeSearchList = () => {
  displaySearchList.value = !displaySearchList.value
}


</script>


<template>
  
  <nav class="sm:py-4 flex sm:justify-center">

    <ul class="gap-2 justify-center text-rm-blue hidden sm:flex">
      <li>
        <SearchButton @click="launchQuery({type: 'all', variables: {page: 1}}, fetchCharacters)" 
        class="uppercase" :class="queryName === 'all' && 'bg-rm-green/75'">
          Show them all !
        </SearchButton>
      </li>
      <li>
        <SearchButton @click="launchQuery({type:'locations', variables:{page: 1}}, fetchQuery)" 
        :class="queryName === 'locations' && 'bg-rm-green/75'">
          By Locations
        </SearchButton>
      </li>
      <li>
        <SearchButton @click="launchQuery({type:'episodes', variables:{page: 1}}, fetchQuery)" 
        :class="queryName === 'episodes' && 'bg-rm-green/75'">
          By Episodes
        </SearchButton>
      </li>
    </ul>

    <BurgerMenu :open="openMobileMenu" @click="openMobileMenu = !openMobileMenu" class="sm:hidden mt-auto"/>

  </nav>

  <Transition>  
    <SearchList v-if="data && displaySearchList && !mobileMenuCanBeShown" :info="data.info" :categories="categories" :queryName="queryName"
      @change-page="changePage"
      @fetch-characters="fetchCharacters"
      @close-search="closeSearchList"
      class="my-4 text-sm border rounded p-2 pr-8 max-w-screen-lg m-auto"
    />
  </Transition>

  <!-- MOBILE -->
  <div v-if="mobileMenuCanBeShown && openMobileMenu" class="fixed inset-0 top-[6.95rem] bg-neutral-700/75 z-50" @click="openMobileMenu = !openMobileMenu"></div>
  <Transition name="menu-slide">
        <aside v-if="mobileMenuCanBeShown && openMobileMenu" class="fixed top-[6.95rem] bottom-0 left-0 w-2/3 bg-white z-[100] overflow-y-auto">
          <ul class="flex flex-col gap-4 items-center py-4 sm:pt-10">
            <li @click="launchQuery({type: 'all', variables: {page: 1}}, fetchCharacters)"
              class="font-bold" :class="{'text-rm-blue': (queryName === 'all' && displaySearchList)}"
            >
              Show them all !
            </li>
            <li @click="launchQuery({type:'locations', variables:{page: 1}}, fetchQuery)"
              class="font-bold" :class="{'text-rm-blue': (queryName === 'locations' && displaySearchList)}"
            >
              By Locations
            </li>
            <li @click="launchQuery({type:'episodes', variables:{page: 1}}, fetchQuery)"
              class="font-bold" :class="{'text-rm-blue': (queryName === 'episodes' && displaySearchList)}"
            >
              By Episodes
            </li>
          </ul>

          <SearchList v-if="data && displaySearchList" :info="data.info" :categories="categories" :queryName="queryName"
            @change-page="changePage"
            @fetch-characters="fetchCharacters"
            @close-search="closeSearchList"
            class="sm:my-4 text-sm border rounded p-2"
          />

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