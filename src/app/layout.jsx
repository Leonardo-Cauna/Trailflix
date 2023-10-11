import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/Components/NavBar'

const inter = Inter({ subsets: ['latin'] })
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'TrailFlix',
  description: 'Netflix, but for trailers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen bg-black">
        <NavBar />
        {children}
      </body>
    </html>
  )
}
