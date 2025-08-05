import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Jetflix - Stream Movies & TV Shows',
  description: 'Discover and watch your favorite movies and TV shows on Jetflix',
  keywords: 'movies, tv shows, streaming, entertainment',
  authors: [{ name: 'Jetflix Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}