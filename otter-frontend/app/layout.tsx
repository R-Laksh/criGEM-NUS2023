/* The code below is a TypeScript React component called `RootLayout`. It is responsible for
rendering the layout of OTTER. */
import { SessionProvider } from "../components/SessionProvider";
import { getServerSession } from "next-auth";
import SideBar from "../components/SideBar";
import '../styles/globals.css';
import type { Metadata } from 'next';
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";
import ClientProvider from "../components/ClientProvider";

export const metadata: Metadata = {
  title: 'OTTER',
  description: 'Optimised Technique for Toehold Engineering and Ranking',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-[#85adcc] flex-1">{children}</div>

              <ClientProvider />

              <div className="bg-[black] max-w-xs h-screen 
              overflow-y-auto md:min-w-[20rem]">
                <SideBar />
              
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  )
}
