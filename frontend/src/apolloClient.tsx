import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export const ApolloWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <ApolloProvider client={client}>{children}</ApolloProvider>;
