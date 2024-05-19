import { gql } from '@apollo/client'
import { CATEGORY_FIELDS } from './fragments'

export const GET_CATEGORIES = gql`
  ${CATEGORY_FIELDS}

  query GetCategories(
    $query: String
    $skip: Int
    $take: Int
    $cursor: String
  ) {
    categories(query: $query, skip: $skip, take: $take, cursor: $cursor) {
      ...CategoryFields
    }
  }
`

export const GET_CATEGORY = gql`
  ${CATEGORY_FIELDS}

  query GetCategory(
    $id: ID!
  ) {
    category(id: $id) {
      ...CategoryFields
    }
  }
`

export const CREATE_CATEGORY = gql`
  ${CATEGORY_FIELDS}

  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory (
      data: $data
    ) {
      ...CategoryFields
    }
  }
`

export const UPDATE_CATEGORY = gql`
  ${CATEGORY_FIELDS}

  mutation UpdateCategory($id: ID!, $data: UpdateCategoryInput!) {
    updateCategory (
      id: $id
      data: $data
    ) {
      ...CategoryFields
    }
  }
`

export const DELETE_CATEGORY = gql`
  ${CATEGORY_FIELDS}

  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      ...CategoryFields
    }
  }
`
