import '../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OTTER',
  description: 'Optimised Technique for Toehold Engineering and Ranking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="flex">
        {/* Sidebar */}

        {/* ClientProvider - Notification*/}

        <div className="bg-[#85adcc] flex-1">{children}</div>
        </div>
      </body>
    </html>
  )
}
