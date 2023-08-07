import { BeakerIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc } from "firebase/firestore";
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
    
    const [messages] = useCollection(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
    );

    useEffect(() => {
        if (!pathname) return;

        setActive(pathname.includes(id))
    }, [pathname]);

    const removeChat = async() => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id ));
        router.replace('/');
    }

    return (
        <Link href={`/chat/${id}`} className={`chatRow justify-center ${active && 'bg-gray-500'}`}>
            <div className="flex items-center p-3 space-x-4">
                <BeakerIcon className="h-5 w-5 text-black" />
                <p className="flex-1 hidden md:inline-flex truncate text-white">
                    {messages?.docs[messages?.docs.length - 1]?.data().text || "New RNA Sequence"}
                </p>
                <TrashIcon
                    onClick={removeChat}
                    className="h-5 w-5 text-gray-900 hover:text-red-700 cursor-pointer"
                />
            </div>
        </Link>
    );
}

export default ChatRow;
