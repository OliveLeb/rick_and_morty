<script setup>
import Icons from './Icons.vue';

  defineProps({
    data: {
      type: Object,
    },
    categories: Array | Object,
    queryName: {
      type: String
    }
  })

</script>


<template>
  <aside>
    <div class="flex flex-wrap gap-2">

      <template v-if="queryName === 'locations' ">

        <div v-for="el in categories" :key="el.id" >
          <button @click="$emit('fetchCharacters', {type:'charLocation', variables: {locationId: el.id }})"
            class="border rounded border-gray-300 p-2 hover:bg-rm-blue hover:text-white"
          >
            {{ el.name }}
          </button>
        </div>

        <div>
          <button v-if="data.info.prev" @click="$emit('changePage',-1)"><Icons name="prev" /></button>
          <button v-if="data.info.next" @click="$emit('changePage',1)"><Icons name="next" /></button>
        </div>
      </template>


      <template v-if="queryName === 'episodes' ">

        <div v-for="(episodes, season, index) in categories" :key="season" class="flex gap-4 mb-4">
          <div class="p-2 border-b rounded">{{ season }}: </div>
          <button v-for="episode in episodes" :key="episode.id"
            @click="$emit('fetchCharacters', {type:'charEpisode', variables: {episodeId: episode.id }})"
            class="border rounded border-gray-300 p-2 hover:bg-rm-blue hover:text-white items-center"
          >
            {{ episode.episode.slice(3) }}
          </button>
          <button class="self-end" 
            v-if="Object.keys(categories).length -1 == index && data.info.next" 
            @click="$emit('changePage', 1)"
          >
            load more...
          </button>
        </div>

      </template>

    </div>
  </aside>
</template>