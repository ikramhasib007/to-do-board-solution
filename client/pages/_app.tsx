import "cross-fetch";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import getClient from "../apollo";
import { GET_USER } from "@/operations/user";
import { ApolloProvider } from "@apollo/client";

const progress = new ProgressBar({
  size: 2,
  color: "#4f46e5",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

export default function App({ Component, pageProps }: AppProps) {
  const client = getClient(pageProps.token)
  client.writeQuery({
    query: GET_USER,
    data: {
      user: pageProps.user || null
    }
  })
  
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
