/* "use client";
import { Toaster } from "react-hot-toast";

export default function ClientProvider() {
    return (
        <>
            <Toaster position="top-right" />
        </>
    )
} */

import { Toaster } from "react-hot-toast";

export default function ClientProvider() {
    return (
        <div className="fixed top-4 center-4 z-50">
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 4000, // Display duration in milliseconds
                    style: {
                        background: "#333", // Change the background color
                        color: "#fff", // Change the text color
                    },
                }}
            />
        </div>
    );
}
