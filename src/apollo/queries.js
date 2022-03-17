import gql from 'graphql-tag'
import { INFO_PART, CHARACTERS_PART } from './fragments'

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
  query getLocations($page: Int) {
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

export const GET_CHARACTERS_BY_LOCATION = gql`
  ${CHARACTERS_PART}
  query getCharactersByLocation($locationId: ID!) {
  location(id: $locationId) {
    id
    name
    residents {
      ...CharactersParts
    }
  }
}
`

export const GET_CHARACTERS_BY_EPISODE = gql`
  ${CHARACTERS_PART}
  query getCharactersByEpisode($episodeId: ID!) {
    episode(id: $episodeId) {
      id
      episode
      name
      characters {
        ...CharactersParts
      }
    }
  }
`

export const GET_ALL_CHARACTERS = gql`
  ${INFO_PART}, ${CHARACTERS_PART}
  query getCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        ...InfoParts
      }
      results {
        ...CharactersParts
      }
    }
  }
`

export const GET_FILTERED_CHARACTERS = gql`
  query getFilteredCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        next
        pages
        prev
      }
      results {
        name
        image
        id
      }
    }
  }
`
