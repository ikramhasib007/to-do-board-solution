import { InMemoryCache } from '@apollo/client'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        categories: {
          read(tickets = []) {  // default value
            return tickets;
          },
          keyArgs: ["query"],
          merge: false
        }
      }
    },

    Category: {
      fields: {
        tickets: { keyArgs: false, merge: false },
      }
    }  
  }
})