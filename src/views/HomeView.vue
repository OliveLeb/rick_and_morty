<script setup>
import { useQuery } from '@vue/apollo-composable'
import { GET_ALL_CHARACTERS } from '@/apollo/queries'
import SearchBar from '../components/SearchBar.vue';

const { result } = useQuery(GET_ALL_CHARACTERS)

</script>

<template>
  <h2 class="text-xl font-bold">Search for Rick and Morty's characters</h2>

  <SearchBar />

  <section>



  </section>

</template>
