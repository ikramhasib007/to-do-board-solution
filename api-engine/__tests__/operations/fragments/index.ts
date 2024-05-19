import { gql } from '@apollo/client'
import {
  CORE_USER_FIELDS,
} from './core'

export const USER_FIELDS = gql`
  ${CORE_USER_FIELDS}

  fragment UserFields on User {
    ...CoreUserFields
  }
`
