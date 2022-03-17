import { ref } from 'vue'

export const useGql = () => {
  

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
  const changePage = (val) => {
    variables.value.page += val
    enable.value = true
  }

  

  return {
    variables,
    enable,
    queryName,
    fetchQuery,
    changePage
  }
}