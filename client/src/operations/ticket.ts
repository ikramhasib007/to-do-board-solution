import { gql } from '@apollo/client'
import { TICKET_FIELDS } from './fragments'
import { CORE_TICKET_FIELDS } from './fragments/core'

export const GET_TICKETS = gql`
  ${TICKET_FIELDS}

  query GetTickets(
    $categoryId: ID
    $userId: ID
    $query: String
    $skip: Int
    $take: Int
    $cursor: String
  ) {
    tickets(
      categoryId: $categoryId,
      userId: $userId,
      query: $query,
      skip: $skip,
      take: $take,
      cursor: $cursor
    ) {
      ...TicketFields
    }
  }
`

export const GET_TICKET = gql`
  ${TICKET_FIELDS}

  query GetTicket(
    $id: ID!
  ) {
    ticket(id: $id) {
      ...TicketFields
    }
  }
`

export const CREATE_TICKET = gql`
  ${TICKET_FIELDS}

  mutation CreateTicket($data: CreateTicketInput!) {
    createTicket (
      data: $data
    ) {
      ...TicketFields
    }
  }
`

export const UPDATE_TICKET = gql`
  ${TICKET_FIELDS}

  mutation UpdateTicket($id: ID!, $data: UpdateTicketInput!) {
    updateTicket (
      id: $id
      data: $data
    ) {
      ...TicketFields
    }
  }
`

export const DELETE_TICKET = gql`
  ${CORE_TICKET_FIELDS}

  mutation DeleteTicket($id: ID!) {
    deleteTicket(id: $id) {
      ...CoreTicketFields
    }
  }
`
