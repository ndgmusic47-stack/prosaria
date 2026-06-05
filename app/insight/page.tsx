import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const metadata = {
  title: 'Insight',
  description: 'Market observations from Prosaria Partners across digital infrastructure, working capital and care sector M&A.',
}

const categoryColours: Record<string, string> = {
  'Care Sector M&A':        'text-blue-300 border-blue-800/40',
  'Digital Infrastructure': 'text-blue-400 border-blue-700/40',
  'Working Capital':        'text-blue-200 border-blue-900/40',
  'Insight':                'text-[#94a3b8] border-[#1e3a5f]',
}

export default function InsightPage() {
  const posts = getAllPosts()
  return (
    <>
      <section className="bg-[#050d1a] pt-40 pb-24 lg:pt-52 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:`linear-gradient(to right,#3b82f6 1px,transparent 1px),linear-gradient(to bottom,#3b82f6 1px,transparent 1px)`,backgroundSize:'80px 80px'}} />
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">Insight</p>
          <h1 className="font-serif text-display-xl text-[#f0f4ff] max-w-[22ch] leading-tight mb-6">
            What is happening in the markets we work in.
          </h1>
          <p className="text-body-lg text-[#94a3b8] max-w-[48ch]">
            We write when there is something worth sharing. No set schedule.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#050d1a]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-display-sm text-[#64748b]">More coming soon.</p>
            </div>
          ) : (
            <div className="divide-y divide-blue-500/8">
              {posts.map((post) => (
                <article key={post.slug} className="py-12 group">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-2">
                      <span className={`text-label border px-2.5 py-1 ${categoryColours[post.category] || categoryColours['Insight']}`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="lg:col-span-8">
                      <h2 className="font-serif text-display-sm text-[#f0f4ff] mb-4 group-hover:text-blue-400 transition-colors duration-200 leading-snug">
                        <Link href={`/insight/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="text-body-sm text-[#94a3b8] max-w-prose">{post.excerpt}</p>
                    </div>
                    <div className="lg:col-span-2 lg:text-right">
                      <Link href={`/insight/${post.slug}`}
                        className="text-label text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest flex items-center gap-2 lg:justify-end">
                        Read
                        <span className="w-4 h-px bg-blue-400" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="light-section border-t border-blue-100 py-16">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div>
            <p className="eyebrow mb-3" style={{color:'#1d4ed8'}}>Follow on LinkedIn</p>
            <p className="font-serif text-display-sm max-w-[36ch]" style={{color:'#050d1a'}}>
              We also post shorter updates on LinkedIn.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 flex-shrink-0">
            <a href="https://www.linkedin.com/in/mrpowell22/" target="_blank" rel="noopener noreferrer" className="btn-outline-dark">Nathan on LinkedIn</a>
            <a href="https://www.linkedin.com/company/prosaria-partners" target="_blank" rel="noopener noreferrer" className="btn-primary">Prosaria on LinkedIn</a>
          </div>
        </div>
      </section>
    </>
  )
}
