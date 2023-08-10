import type { NextPage } from 'next';
import Head from "next/head";
import Header from "../components/Header2"
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';

const OTTERLand: NextPage = () => {

  return (
    <div className="">
      <Head>
        <title>OTTERSIDE</title>
      </Head>
      
      <SessionProvider>
        <Header />
      </SessionProvider>
    </div>
  )
}

export default OTTERLand
