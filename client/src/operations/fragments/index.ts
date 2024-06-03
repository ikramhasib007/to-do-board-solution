import { gql } from '@apollo/client'
import {
  CORE_USER_FIELDS,
  CORE_CATEGORY_FIELDS,
  CORE_TICKET_FIELDS,
  CORE_LABEL_FIELDS,
} from './core'

export const USER_FIELDS = gql`
  ${CORE_USER_FIELDS}

  fragment UserFields on User {
    ...CoreUserFields
  }
`

export const CATEGORY_FIELDS = gql`
  ${CORE_CATEGORY_FIELDS}
  ${CORE_TICKET_FIELDS}

  fragment CategoryFields on Category {
    ...CoreCategoryFields
    tickets {
      ...CoreTicketFields
    }
  }
`

export const TICKET_FIELDS = gql`
  ${CORE_TICKET_FIELDS}
  ${CORE_CATEGORY_FIELDS}
  ${CORE_LABEL_FIELDS}
  ${CORE_USER_FIELDS}

  fragment TicketFields on Ticket {
    ...CoreTicketFields
    category {
      ...CoreCategoryFields
    }
    user {
      ...CoreUserFields
    }
    labels {
      ...CoreLabelFields
    }
  }
`

export const LABEL_FIELDS = gql`
  ${CORE_LABEL_FIELDS}
  ${CORE_TICKET_FIELDS}

  fragment LabelFields on Label {
    ...CoreLabelFields
    ticket {
      ...CoreTicketFields
    }
  }
`