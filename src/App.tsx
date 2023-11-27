import Web3Container from "./Web3Container";
import Router from "./Router";
import { relayStylePagination } from "@apollo/client/utilities";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function App() {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          comments: relayStylePagination(),
        },
      },
    },
  });
  const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPH_ENDPOINT,
    cache: cache,
  });
  return (
    <Web3Container>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </Web3Container>
  );
}

export default App;
