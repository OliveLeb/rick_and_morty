import gql from 'graphql-tag'

export const INFO_PART = gql`
  fragment InfoParts on Info {
    pages
    next
    prev
  }
`