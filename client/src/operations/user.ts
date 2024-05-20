import { gql } from '@apollo/client'
import { USER_FIELDS } from './fragments'

export const GET_USERS = gql`
  ${USER_FIELDS}

  query GetUsers(
    $query: String
    $skip: Int
    $take: Int
    $cursor: String
  ) {
    users(query: $query, skip: $skip, take: $take, cursor: $cursor) {
      ...UserFields
    }
  }
`

export const GET_USER = gql`
  ${USER_FIELDS}

  query GetUser(
    $id: ID
  ) {
    user(id: $id) {
      ...UserFields
    }
  }
`

export const CREATE_USER = gql`
  ${USER_FIELDS}

  mutation CreateUser($data: CreateUserInput!) {
    createUser (
      data: $data
    ) {
      token
      user {
        ...UserFields
      }
    }
  }
`

export const UPDATE_USER = gql`
  ${USER_FIELDS}

  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser (
      data: $data
    ) {
      ...UserFields
    }
  }
`

export const DELETE_USER = gql`
  ${USER_FIELDS}

  mutation DeleteUser {
    deleteUser {
      ...UserFields
    }
  }
`

export const LOGIN = gql`
  ${USER_FIELDS}

  mutation Login($data: LoginUserInput!) {
    login (
      data: $data
    ) {
      token
      user {
        ...UserFields
      }
    }
  }
`
