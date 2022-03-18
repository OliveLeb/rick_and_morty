import { ref, markRaw, computed } from 'vue'
import {
  GET_ALL_CHARACTERS,
  GET_CHARACTERS_BY_LOCATION,
  GET_CHARACTERS_BY_EPISODE,
  GET_EPISODES,
  GET_LOCATIONS,
} from '@/apollo/queries'
import { useQuery, useResult } from '@vue/apollo-composable'

export const useGql = () => {
  

  const queries = markRaw({
    charLocation: GET_CHARACTERS_BY_LOCATION,
    charEpisode: GET_CHARACTERS_BY_EPISODE,
    charAll: GET_ALL_CHARACTERS,
    locations: GET_LOCATIONS,
    episodes: GET_EPISODES,
  })


  // mutate to enable useQuery
  const enable = ref(false)

  // variables to pass to apollo-composable useQuery
  const variables = ref({})

  /*
  * Query name (eg: 'locations', 'episodes' or else...) 
  * Use it if you have to choose between multiple queries in the same componenent
  */
  const queryName = ref(null)


  /* 
  * Chose which query if multiple choice of queries to chose and enable useQuery
  * set the variables if needed
  */
  const fetchQuery = (e) => {
    queryName.value = e.type
    if (variables) variables.value = {...e.variables}
    enable.value = true
  }

  /*
  * Change page variable then enable useQuery
  */
  const changePage = (val, type) => {
    if (type === 'page') variables.value.page = val
    else variables.value.page += val
    enable.value = true
  }

  /*
  * Choose query depending of queryName
  */
  const gqlQuery = computed(() => queryName.value && queries[queryName.value])

  /*
  * Fetch the query, passing variable if needed
  */
  const { result, loading, error, onResult } = useQuery(
    gqlQuery,
    variables,
    () => ({ enabled: enable.value})
  )

  const data = useResult(result)

  /*
  * Disable useQuery once fetching done
  */
  onResult((queryResult) => {
    if (!queryResult.loading) {
      enable.value = false
    }
  })

  

  return {
    variables,
    enable,
    queryName,
    fetchQuery,
    changePage,
    data,
    loading,
    error
  }
}