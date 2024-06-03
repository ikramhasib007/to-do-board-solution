import { gql } from '@apollo/client'
import { LABEL_FIELDS } from './fragments'

export const GET_LABELS = gql`
  ${LABEL_FIELDS}

  query GetLabels(
    $ticketId: ID
    $query: String
    $skip: Int
    $take: Int
    $cursor: String
  ) {
    labels(ticketId: $ticketId, query: $query, skip: $skip, take: $take, cursor: $cursor) {
      ...LabelFields
    }
  }
`

export const GET_LABEL = gql`
  ${LABEL_FIELDS}

  query GetLabel(
    $id: ID!
  ) {
    label(id: $id) {
      ...LabelFields
    }
  }
`

export const CREATE_LABEL = gql`
  ${LABEL_FIELDS}

  mutation CreateLabel($data: CreateLabelInput!) {
    createLabel (
      data: $data
    ) {
      ...LabelFields
    }
  }
`

export const UPDATE_LABEL = gql`
  ${LABEL_FIELDS}

  mutation UpdateLabel($id: ID!, $data: UpdateLabelInput!) {
    updateLabel (
      id: $id
      data: $data
    ) {
      ...LabelFields
    }
  }
`

export const DELETE_LABEL = gql`
  ${LABEL_FIELDS}

  mutation DeleteLabel($id: ID!) {
    deleteLabel(id: $id) {
      ...LabelFields
    }
  }
`
