/**
 * This is a TypeScript React component that renders a chat interface and displays messages from a
 * Firestore collection.
 * @property {string} chatId - The `chatId` property is a string that represents the unique identifier
 * of the chat. It is used to query the messages specific to that chat from the Firestore database.
 */
'use client';

import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats", chatId, "messages"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 p-4">
      {messages?.empty ? (
        <div className="flex flex-col items-center mt-10">
          <p className="text-center text-gray-600">
            Key in your RNA sequence to get started!
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mt-5 text-gray-400 animate-bounce" />
        </div>
      ) : (
        <div>
          {messages?.docs.map((message) => (
            <Message key={message.id} message={message.data()} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Chat;