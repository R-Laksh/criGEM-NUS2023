/**
 * The `SessionProvider` component is a wrapper that provides the session information to its children
 * components using the `next-auth` library in a TypeScript React application.
 * @param {Props}  - - `children`: This is a special prop in React that represents the child elements
 * of a component. It allows you to pass components or JSX elements as children to another component.
 * @returns The SessionProvider component is being returned.
 */
'use client'

import { Session } from "next-auth";
import { SessionProvider as Provider} from "next-auth/react"


type Props = {
    children: React.ReactNode;
    session: Session | null;
}

export function SessionProvider( { children, session }: Props) {
    return (
        <Provider>
            {children}
        </Provider>
    )
}