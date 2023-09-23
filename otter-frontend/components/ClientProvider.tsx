/**
 * The `ClientProvider` function returns a React component that renders a `Toaster` component from the
 * `react-hot-toast` library, which displays toast notifications at the top center of the screen.
 * @returns The code is returning a React component called `ClientProvider`.
 */
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
