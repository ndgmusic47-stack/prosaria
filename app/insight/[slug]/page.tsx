import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

async function markdownToHtml(markdown: string) {
  const result = await remark().use(remarkHtml).process(markdown)
  return result.toString()
}

const categoryColours: Record<string, string> = {
  'Care Sector M&A':        'text-[#2E5E44] border-[#2E5E44]/30',
  'Succession':             'text-[#A67C4E] border-[#A67C4E]/40',
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()
  const html = await markdownToHtml(post.content)

  return (
    <>
      <section className="bg-[#F7F3EC] pt-40 pb-20 lg:pt-52 lg:pb-24 relative overflow-hidden">
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <Link href="/insight" className="eyebrow text-[#7E8A7E] hover:text-[#2E5E44] transition-colors mb-8 block">
            ← Insight
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className={`text-label border px-2.5 py-1 ${categoryColours[post.category] || 'text-[#5C6B5F] border-[#D8CFC0]'}`}>
              {post.category}
            </span>
          </div>
          <h1 className="font-serif text-display-lg text-[#1F3D2B] leading-tight max-w-[28ch]">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="py-20 bg-[#F7F3EC]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="max-w-[680px]">
            <div
              className="text-[#5C6B5F] leading-relaxed"
              style={{fontSize:'1.0625rem',lineHeight:'1.85'}}
              dangerouslySetInnerHTML={{ __html: html
                .replace(/<h2>/g, '<h2 style="font-family:var(--font-serif);font-size:clamp(1.4rem,3vw,1.8rem);font-weight:400;color:#f0f4ff;margin:2.5rem 0 1rem;letter-spacing:-0.015em">')
                .replace(/<p>/g, '<p style="margin-bottom:1.5rem;color:#94a3b8">')
                .replace(/<ul>/g, '<ul style="margin:1.2rem 0 1.5rem;padding-left:1.5rem;color:#94a3b8">')
                .replace(/<li>/g, '<li style="margin-bottom:0.7rem">')
              }}
            />
          </div>

          <div className="max-w-[680px] mt-16 pt-12 border-t border-[#2E5E44]/12">
            <p className="text-label text-[#8A948A] mb-1 uppercase tracking-widest">Published by</p>
            <p className="text-body-sm text-[#5C6B5F]">Prosaria Partners — <a href="https://www.linkedin.com/company/prosaria-partners" className="text-[#2E5E44] hover:text-[#3E7A58] transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          </div>
        </div>
      </section>

      <section className="light-section py-20">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <h2 className="font-serif text-display-md max-w-[32ch]" style={{color:'#1F3D2B'}}>
            Relevant to your situation? Let&apos;s have a conversation.
          </h2>
          <Link href="/contact" className="btn-primary flex-shrink-0">Get in touch</Link>
        </div>
      </section>
    </>
  )
}
