/* The code is importing the `ApolloClient` and `InMemoryCache` classes from the `@apollo/client`
package. */
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://welkom.stepzen.net/api/otterside/__graphql",
    headers: {
        Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`
    },
    cache: new InMemoryCache(),
});

export default client;