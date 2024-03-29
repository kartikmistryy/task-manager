import { Inter } from 'next/font/google'
import './globals.css'
import { MyContext, MyContextProvider } from './Context/Context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Task Master',
  description: 'Manage your workflow efficiently',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <MyContextProvider>
        {children}
      </MyContextProvider>
      </body>

    </html>
  )
}
