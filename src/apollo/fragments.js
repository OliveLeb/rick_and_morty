import gql from 'graphql-tag'

export const INFO_PART = gql`
  fragment InfoParts on Info {
    pages
    next
    prev
  }
`

export const CHARACTERS_PART = gql`
  fragment CharactersParts on Character {
    id
    name
    image
  }
`