<script setup>
import { useQuery } from '@vue/apollo-composable'
import ALL_CHARACTER_QUERY from '@/apollo/allCharacters.query.gql'

const { result } = useQuery(ALL_CHARACTER_QUERY)

</script>

<template>
  <h2 class="text-xl font-bold">Search for Rick and Morty's characters</h2>

  <nav>



  </nav>

  <section>



  </section>

</template>
