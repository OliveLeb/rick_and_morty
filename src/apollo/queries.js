import gql from 'graphql-tag'

export const GET_EPISODES = gql`
  query getEpisodes($page: Int) {
    episodes(page: $page) {
      results {
        id
        episode
        name
      }
      info {
        pages
      }
    }
  }
`

export const GET_ALL_CHARACTERS = gql`
  query getCharacters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`
