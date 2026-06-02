import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'content/posts')

export type Post = {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  content: string
}

export function getAllPosts(): Omit<Post, 'content'>[] {
  if (!fs.existsSync(postsDir)) return []

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))

  return files
    .map((filename) => {
      const slug = filename.replace('.md', '')
      const raw  = fs.readFileSync(path.join(postsDir, filename), 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title:    data.title    || 'Untitled',
        date:     data.date     || '',
        category: data.category || 'Insight',
        excerpt:  data.excerpt  || '',
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  const filepath = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title:    data.title    || 'Untitled',
    date:     data.date     || '',
    category: data.category || 'Insight',
    excerpt:  data.excerpt  || '',
    content,
  }
}
