import { getPostData } from '@/lib/posts'
import { getSortedPostsData } from '@/lib/posts'
import { Metadata } from 'next'
import type { Post } from '@/types/post'

// 添加这个函数来生成静态路径
export async function generateStaticParams() {
  const posts = getSortedPostsData() as Post[]
  return posts.map((post: Post) => ({
    slug: post.id,
  }))
}

// 生成动态元数据
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostData(params.slug)
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug)
  
  return (
    <article className="container mx-auto py-12 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600">
          <time>{post.date}</time>
        </div>
      </header>
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
      />
    </article>
  )
} 