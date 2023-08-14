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
    <div>
      <Head>
        <title>OTTERSIDE</title>
      </Head>
      <ApolloProvider client={client}>
        <SessionProvider>
          <Header />
          <div className="my-7 mx-auto max-w-5xl"> 
            <PostBox />
          </div>
          <div>
            {/* Feed */}
          </div>
        </SessionProvider>
      </ApolloProvider>
    </div>
  )
}

export default OTTERSide
