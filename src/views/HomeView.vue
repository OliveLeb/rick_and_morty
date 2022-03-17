<script setup>
import { useQuery } from '@vue/apollo-composable'
import { GET_ALL_CHARACTERS } from '@/apollo/queries'
import SearchBar from '../components/SearchBar.vue';

const { result } = useQuery(GET_ALL_CHARACTERS)

</script>

<template>

  <SearchBar />

  <section>

  </section>

</template>
