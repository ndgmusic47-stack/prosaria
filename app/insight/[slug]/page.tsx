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
  'Care Sector M&A':        'text-blue-300 border-blue-800/40',
  'Working Capital':        'text-blue-200 border-blue-900/40',
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()
  const html = await markdownToHtml(post.content)

  return (
    <>
      <section className="bg-[#050d1a] pt-40 pb-20 lg:pt-52 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:`linear-gradient(to right,#3b82f6 1px,transparent 1px),linear-gradient(to bottom,#3b82f6 1px,transparent 1px)`,backgroundSize:'80px 80px'}} />
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <Link href="/insight" className="eyebrow text-[#475569] hover:text-blue-400 transition-colors mb-8 block">
            ← Insight
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className={`text-label border px-2.5 py-1 ${categoryColours[post.category] || 'text-[#94a3b8] border-[#1e3a5f]'}`}>
              {post.category}
            </span>
          </div>
          <h1 className="font-serif text-display-lg text-[#f0f4ff] leading-tight max-w-[28ch]">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="py-20 bg-[#050d1a]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="max-w-[680px]">
            <div
              className="text-[#94a3b8] leading-relaxed"
              style={{fontSize:'1.0625rem',lineHeight:'1.85'}}
              dangerouslySetInnerHTML={{ __html: html
                .replace(/<h2>/g, '<h2 style="font-family:var(--font-serif);font-size:clamp(1.4rem,3vw,1.8rem);font-weight:400;color:#f0f4ff;margin:2.5rem 0 1rem;letter-spacing:-0.015em">')
                .replace(/<p>/g, '<p style="margin-bottom:1.5rem;color:#94a3b8">')
                .replace(/<ul>/g, '<ul style="margin:1.2rem 0 1.5rem;padding-left:1.5rem;color:#94a3b8">')
                .replace(/<li>/g, '<li style="margin-bottom:0.7rem">')
              }}
            />
          </div>

          <div className="max-w-[680px] mt-16 pt-12 border-t border-blue-500/8">
            <p className="text-label text-[#334155] mb-1 uppercase tracking-widest">Published by</p>
            <p className="text-body-sm text-[#94a3b8]">Prosaria Partners — <a href="https://www.linkedin.com/company/prosaria-partners" className="text-blue-400 hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          </div>
        </div>
      </section>

      <section className="light-section py-20">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <h2 className="font-serif text-display-md max-w-[32ch]" style={{color:'#050d1a'}}>
            Relevant to your situation? Let&apos;s have a conversation.
          </h2>
          <Link href="/contact" className="btn-primary flex-shrink-0">Get in touch</Link>
        </div>
      </section>
    </>
  )
}
