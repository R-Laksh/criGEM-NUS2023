'use client'

import { query, orderBy, collection } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import NewChat from "./NewChat";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import { useRouter } from "next/navigation";


function SideBar() {
    const { data: session } = useSession();
    const router = useRouter();

    const goToOTTERSide = () => {
      router.push('/OTTERSide');
    };

    const [chats, loading, error] = useCollection(
      session && query(collection(db, 'users', session.user?.email!, 'chats'),
      orderBy("createdAt", "asc")
    )
  );

  return (
    <div className="p-2 flex flex-col h-screen">
        <div className="flex-1">

            <NewChat />
            {session && (
              <div className="hidden sm:inline">
                  <ModelSelection />
              </div>
            )}

            <div className="flex flex-col space-y-2 my-2">

              {loading && (
                <div className="animate-pulse text-center text-white">
                  <p>Loading your RNA inputs...</p>
                </div>
              )}
              {/* Map through the ChatRows */}
              {chats?.docs.map(chat => (
                <ChatRow key={chat.id} id={chat.id} />
              ))}
            </div>

          </div>

        {session && (
          <img 
            onClick={() => signOut()}
            src={session.user?.image!} 
            alt="Profile pic" 
            className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2
            hover:opacity-50"
          />
        )}
        <button
          onClick={goToOTTERSide} // Use the function to handle navigation
          className="block py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold text-center hover:bg-blue-600"
        >
          Go to the OTTER side
        </button>
    </div>
  )
}

export default SideBar;
