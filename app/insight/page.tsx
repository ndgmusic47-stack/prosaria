import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const metadata = {
  title: 'Insight',
  description: 'Nathan Powell writes about deal origination, digital infrastructure, working capital and care sector M&A.',
}

const categoryColours: Record<string, string> = {
  'Care Sector M&A':        'text-blue-400 border-[#c9a96e]/20',
  'Digital Infrastructure': 'text-[#8cb4c9] border-[#8cb4c9]/20',
  'Working Capital':        'text-[#9cb88c] border-[#9cb88c]/20',
  'Insight':                'text-[#94a3b8] border-blue-500/10',
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

export default function InsightPage() {
  const posts = getAllPosts()

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative bg-[#050d1a] pt-40 pb-24 lg:pt-52 lg:pb-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #c9a96e 1px, transparent 1px), linear-gradient(to bottom, #c9a96e 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">Insight</p>
          <h1 className="font-serif text-display-xl text-[#f0ede8] max-w-[20ch] leading-tight mb-8">
            What is actually happening in the markets we operate in.
          </h1>
          <p className="text-body-lg text-[#94a3b8] max-w-[48ch]">
            Nathan writes when there is something worth saying. No newsletter cadence. No content marketing. Just observations from the deal flow.
          </p>
        </div>
      </section>

      {/* ── POSTS ─────────────────────────────────────────── */}
      <section className="py-section bg-[#050d1a]">
        <div className="max-w-site mx-auto px-6 lg:px-10">

          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-display-sm text-[#475569]">More insight coming soon.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {posts.map((post) => (
                <article key={post.slug} className="py-12 group">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* Date + category */}
                    <div className="lg:col-span-3">
                      <p className="text-label text-[#475569] mb-2">{formatDate(post.date)}</p>
                      <span className={`text-label border px-2.5 py-1 ${categoryColours[post.category] || categoryColours['Insight']}`}>
                        {post.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-7">
                      <h2 className="font-serif text-display-sm text-[#f0f4ff] mb-4 group-hover:text-blue-400 transition-colors duration-200 leading-snug">
                        <Link href={`/insight/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-body-sm text-[#94a3b8] max-w-prose">{post.excerpt}</p>
                    </div>

                    {/* Read more */}
                    <div className="lg:col-span-2 lg:text-right">
                      <Link
                        href={`/insight/${post.slug}`}
                        className="text-label text-blue-400 hover:text-[#a07d44] transition-colors duration-200 uppercase tracking-widest flex items-center gap-2 lg:justify-end"
                      >
                        Read
                        <span className="w-4 h-px bg-[#c9a96e] group-hover:w-6 transition-all duration-200" />
                      </Link>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ── LINKEDIN STRIP ────────────────────────────────── */}
      <section className="bg-[#020810] border-t border-blue-500/10 py-16">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div>
            <p className="eyebrow mb-3">On LinkedIn</p>
            <p className="font-serif text-display-sm text-[#f0f4ff] max-w-[36ch]">
              Nathan posts regularly on LinkedIn — shorter observations that do not always make it here.
            </p>
          </div>
          <a
            href="https://linkedin.com/in/nathanpowell"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex-shrink-0"
          >
            Follow on LinkedIn
          </a>
        </div>
      </section>
    </>
  )
}
