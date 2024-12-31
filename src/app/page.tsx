// pages/index.js
import fs from 'fs'
import path from 'path'
import { getSortedPostsData } from '@/lib/posts'
import ResourceList from '@/components/ResourceList'
import ArticleList from '@/components/ArticleList'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Colorwood - A Colorful World of Games, Discover the Best Mini-Game Platforms', description: 'Colorwood is a vibrant and engaging game aggregation and navigation website, designed to bring together a diverse array of mini-game platforms. The name "Colorwood" symbolizes a colorful world, akin to a fairy tale, where users can immerse themselves in delightful games and enjoy their leisure time. Our mission is to provide a comprehensive and enjoyable gaming experience, helping users discover the best mini-games available. Whether you are looking to relax, have fun, or explore new gaming adventures, Colorwood is your go-to destination for a colorful and magical gaming journey.', }

export default function Home() {
  const resourcesPath = path.join(process.cwd(), 'data', 'json', 'resources.json')
  const resources = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'))
  const allPostsData = getSortedPostsData().slice(0, 6)

  return (
    <div className="container mx-auto py-12 space-y-16">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="gradient-text">Color</span>Wood
        </h1>
        <h2 className="text-2xl tracking-tighter sm:text-3xl md:text-3xl lg:text-3xl">
          A Colorful World of Games, Discover the Best Mini-Game Platforms
        </h2>
        <p className="description-text">
          Colorwood is a vibrant and engaging game aggregation and navigation website, 
          designed to bring together a diverse array of mini-game platforms. The name 
          &ldquo;Colorwood&rdquo; symbolizes a colorful world, akin to a fairy tale, where users 
          can immerse themselves in delightful games and enjoy their leisure time. 
          Our mission is to provide a comprehensive and enjoyable gaming experience, 
          helping users discover the best mini-games available. Whether you&rsquo;re looking 
          to relax, have fun, or explore new gaming adventures, Colorwood is your 
          go-to destination for a colorful and magical gaming journey.
        </p>
      </section>

      <ResourceList resources={resources} />
      <ArticleList articles={allPostsData} />
    </div>
  )
}