<script setup>
import { useQuery } from '@vue/apollo-composable'
import ALL_CHARACTER_QUERY from '@/apollo/allCharacters.query.gql'

const { result } = useQuery(ALL_CHARACTER_QUERY)

</script>

<template>
  <h1 class="text-red-500">Home</h1>
</template>
