import { ApolloClient, createNetworkInterface } from 'apollo-client';

export function getClient() {
  return new ApolloClient({
    networkInterface: createNetworkInterface({
      uri: 'http://localhost:5000',
      opts: {
        credentials: 'same-origin',
      },
    }),
  });
}
