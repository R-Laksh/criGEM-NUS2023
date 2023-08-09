import type { NextPage } from 'next';
import Head from "next/head";
import Image from "next/image"
import Header from "../components/Header2"
import '../styles/globals.css';
import { SessionProvider } from "../components/SessionProvider";
import { getServerSession } from "next-auth";
import type { Metadata } from 'next';
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";
import ClientProvider from "../components/ClientProvider";

const OTTERLand: NextPage = () => {

  return (
    <div className="">
      <Head>
        <title>OTTERLand</title>
      </Head>
      <Header />
    </div>
  )
}

export default OTTERLand

