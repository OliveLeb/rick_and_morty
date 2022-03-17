import gql from 'graphql-tag'
import { INFO_PART } from './fragments'

export const GET_EPISODES = gql`
  ${ INFO_PART }
  query getEpisodes($page: Int) {
    episodes(page: $page) {
      info {
       ...InfoParts
      }
      results {
        id
        episode
        name
      }
    }
  }
`

export const GET_LOCATIONS = gql`
  ${INFO_PART}
  query Locations($page: Int) {
    locations(page: $page) {
      info {
        ...InfoParts
      }
      results {
        id
        name
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
