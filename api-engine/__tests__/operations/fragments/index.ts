import { gql } from '@apollo/client'
import {
  CORE_USER_FIELDS,
  CORE_CATEGORY_FIELDS,
  CORE_LABEL_FIELDS,
  CORE_TICKET_FIELDS,
} from './core'

export const USER_FIELDS = gql`
  ${CORE_USER_FIELDS}

  fragment UserFields on User {
    ...CoreUserFields
  }
`

export const CATEGORY_FIELDS = gql`
  ${CORE_CATEGORY_FIELDS}
  ${CORE_LABEL_FIELDS}
  ${CORE_TICKET_FIELDS}

  fragment CategoryFields on Category {
    ...CoreCategoryFields
    labels {
      ...CoreLabelFields
    }
    tickets {
      ...CoreTicketFields
    }
  }
`

export const LABEL_FIELDS = gql`
  ${CORE_LABEL_FIELDS}
  ${CORE_CATEGORY_FIELDS}

  fragment LabelFields on Label {
    ...CoreLabelFields
    category {
      ...CoreCategoryFields
    }
  }
`
