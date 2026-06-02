import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
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
  'Care Sector M&A':        'text-blue-400 border-[#c9a96e]/20',
  'Digital Infrastructure': 'text-[#8cb4c9] border-[#8cb4c9]/20',
  'Working Capital':        'text-[#9cb88c] border-[#9cb88c]/20',
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const html = await markdownToHtml(post.content)

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative bg-[#050d1a] pt-40 pb-20 lg:pt-52 lg:pb-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #c9a96e 1px, transparent 1px), linear-gradient(to bottom, #c9a96e 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        <div className="relative max-w-site mx-auto px-6 lg:px-10 max-w-[720px]">
          <Link href="/insight" className="eyebrow text-[#94a3b8] hover:text-blue-400 transition-colors duration-200 mb-8 block">
            ← Insight
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className={`text-label border px-2.5 py-1 ${categoryColours[post.category] || 'text-[#94a3b8] border-stone-700'}`}>
              {post.category}
            </span>
            <span className="text-label text-[#3a3834]">{formatDate(post.date)}</span>
          </div>
          <h1 className="font-serif text-display-lg text-[#f0ede8] leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* ── CONTENT ───────────────────────────────────────── */}
      <section className="py-section bg-[#050d1a]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          <div className="max-w-[680px]">
            <div
              className="prose-prosaria"
              style={{
                fontSize: '1.0625rem',
                lineHeight: '1.8',
                color: '#3a3834',
              }}
              dangerouslySetInnerHTML={{ __html: html
                .replace(/<h2>/g, '<h2 style="font-family:var(--font-serif);font-size:1.6rem;font-weight:400;color:#1a1916;margin:2.5rem 0 1rem;letter-spacing:-0.015em">')
                .replace(/<p>/g, '<p style="margin-bottom:1.4rem">')
                .replace(/<ul>/g, '<ul style="margin:1.2rem 0 1.4rem;padding-left:1.5rem">')
                .replace(/<li>/g, '<li style="margin-bottom:0.6rem">')
              }}
            />
          </div>

          {/* Author card */}
          <div className="max-w-[680px] mt-16 pt-12 border-t border-blue-500/10">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-[#0a1628] border border-blue-500/10 flex-shrink-0" />
              <div>
                <p className="font-sans font-medium text-[#f0f4ff]">Nathan Powell</p>
                <p className="text-body-sm text-[#94a3b8]">Founder, Prosaria Partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="relative bg-[#050d1a] py-section-sm">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <h2 className="font-serif text-display-md text-[#f0ede8] max-w-[32ch]">
            Relevant to your situation? Talk to Nathan directly.
          </h2>
          <Link href="/contact" className="btn-primary flex-shrink-0">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  )
}
