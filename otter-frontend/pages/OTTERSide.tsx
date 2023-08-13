import type { NextPage } from 'next';
import Head from "next/head";
import Header from "../components/Header"
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from "@apollo/client";
import client from '../apollo-client'
import PostBox from "../components/PostBox";

const OTTERSide: NextPage = () => {

  return (
    <div className="">
      <Head>
        <title>OTTERSIDE</title>
      </Head>
      <ApolloProvider client={client}>
        <SessionProvider>
          <Header />
          {/* PostBox */}
          <PostBox />


          <div>
            {/* Feed */}
          </div>
        </SessionProvider>
      </ApolloProvider>
    </div>
  )
}

export default OTTERSide
