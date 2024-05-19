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

export const CORE_CATEGORY_FIELDS = gql`
  fragment CoreCategoryFields on Category {
    id
    title
    isDeleted
    createdAt
    updatedAt
  }
`

export const CORE_LABEL_FIELDS = gql`
  fragment CoreLabelFields on Label {
    id
    title
    createdAt
    updatedAt
  }
`

export const CORE_TICKET_FIELDS = gql`
  fragment CoreTicketFields on Ticket {
    id
    title
    description
    expiryDate
    status
    isDeleted
    createdAt
    updatedAt
  }
`
