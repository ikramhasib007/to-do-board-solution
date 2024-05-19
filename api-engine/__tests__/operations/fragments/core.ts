import { gql } from '@apollo/client'

export const CORE_USER_FIELDS = gql`
  fragment CoreUserFields on User {
    id
    firstName
    lastName
    email
    isDeleted
    createdAt
    updatedAt
  }
`

