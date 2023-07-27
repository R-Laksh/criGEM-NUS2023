import { BeakerIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, query, orderBy } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { useEffect } from "react";

type Props = {
    id: string;
}

function ChatRow({ id }: Props) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession()
    const [active, setActive] = useState(false);
    
    const [messages] = useCollection(query(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
        orderBy('createdAt', 'asc')
        )
    );

    useEffect(() => {
        if (!pathname) return;

        setActive(pathname.includes(id))
    }, [pathname])

  return (
  <Link href={`/chat/${id}`} className={`chatRow justify-center ${active && 'bg-blue-700/40'}`}>
    <BeakerIcon className="h-5 w-5"/>
    <p className="flex-1 hidden md:inline-flex truncate">
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New RNA Sequence"}
    </p>
    <TrashIcon className="h-5 w-5 text-gray-700 hover:text-red-700" />
  </Link>
  );
}

export default ChatRow