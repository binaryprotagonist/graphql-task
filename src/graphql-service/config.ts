import { InMemoryCache } from '@apollo/client';

export const memoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        launchesPast: {
          // Don't cache separate results based on
          // any of this field's arguments.
          keyArgs: false,

          // Concatenate the incoming list items with
          // the existing list items.
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});
