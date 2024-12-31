import './globals.css'
import { Inter } from 'next/font/google'
import { Layout } from '@/components/Layout'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: {
    default: 'ColorWood',
    template: '%s | GitBase'
  },
  description: 'Colorwood is a vibrant and engaging game aggregation and navigation website, designed to bring together a diverse array of mini-game platforms. The name "Colorwood" symbolizes a colorful world, akin to a fairy tale, where users can immerse themselves in delightful games and enjoy their leisure time. Our mission is to provide a comprehensive and enjoyable gaming experience, helping users discover the best mini-games available. Whether you\'re looking to relax, have fun, or explore new gaming adventures, Colorwood is your go-to destination for a colorful and magical gaming journey.',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}