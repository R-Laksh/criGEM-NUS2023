import type { NextPage } from 'next';
import Head from "next/head";
import Header from "../components/Header"
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider, useQuery } from "@apollo/client";
import client from '../apollo-client'
import PostBox from "../components/PostBox";
import { Toaster } from "react-hot-toast";
import Feed from '@/components/Feed';
import Avatar from '@/components/Avatar';
import { GET_SPACES_WITH_LIMIT } from '@/graphql/queries';
import SpaceRow from '@/components/SpaceRow';

const OTTERSide: NextPage = () => {
  const { data } = useQuery(GET_SPACES_WITH_LIMIT, {
    variables: {
      limit: 10,
    }
  })

  const spaces: Space[] = data?.getSpaceListLimit
  return (
    <div>
      <Head>
        <title>OTTERSIDE</title>
      </Head>
      <ApolloProvider client={client}>
        <SessionProvider>
          <Toaster />
          <Header />
          <div className="my-7 mx-auto max-w-5xl"> 
            <PostBox />
          </div>
          <div>
            <Feed />

            <div className="sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] 
            rounded-md border border-gray-300 bg-white lg:inline">
              <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>

              <div>
                {spaces?.map((space, i) => (
                  <SpaceRow key={space.id} topic={space.topic} index={i}/>
                ))}
              </div>
            </div>
          </div>
        </SessionProvider>
      </ApolloProvider>
    </div>
  )
}

export default OTTERSide
