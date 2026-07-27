import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export const metadata = {
  title: 'Insight',
  description: 'Market observations from Prosaria on UK healthcare M&A, succession, and sale preparation.',
}

const categoryColours: Record<string, string> = {
  'Care Sector M&A':        'text-[#2E5E44] border-[#2E5E44]/30',
  'Succession':             'text-[#A67C4E] border-[#A67C4E]/40',
  'Insight':                'text-[#5C6B5F] border-[#D8CFC0]',
}

export default function InsightPage() {
  const posts = getAllPosts()
  return (
    <>
      <section className="bg-[#F7F3EC] pt-40 pb-24 lg:pt-52 lg:pb-28 relative overflow-hidden">
        <div className="relative max-w-site mx-auto px-6 lg:px-10">
          <p className="eyebrow mb-6">Insight</p>
          <h1 className="font-serif text-display-xl text-[#1F3D2B] max-w-[22ch] leading-tight mb-6">
            What is happening in the markets we work in.
          </h1>
          <p className="text-body-lg text-[#5C6B5F] max-w-[48ch]">
            We write when there is something worth sharing. No set schedule.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#F7F3EC]">
        <div className="max-w-site mx-auto px-6 lg:px-10">
          {posts.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-display-sm text-[#6E7B6F]">More coming soon.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#2E5E44]/10">
              {posts.map((post) => (
                <article key={post.slug} className="py-12 group">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-2">
                      <span className={`text-label border px-2.5 py-1 ${categoryColours[post.category] || categoryColours['Insight']}`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="lg:col-span-8">
                      <h2 className="font-serif text-display-sm text-[#1F3D2B] mb-4 group-hover:text-[#2E5E44] transition-colors duration-200 leading-snug">
                        <Link href={`/insight/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="text-body-sm text-[#5C6B5F] max-w-prose">{post.excerpt}</p>
                    </div>
                    <div className="lg:col-span-2 lg:text-right">
                      <Link href={`/insight/${post.slug}`}
                        className="text-label text-[#2E5E44] hover:text-[#3E7A58] transition-colors uppercase tracking-widest flex items-center gap-2 lg:justify-end">
                        Read
                        <span className="w-4 h-px bg-[#2E5E44]" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="light-section border-t border-[#E6DFD2] py-16">
        <div className="max-w-site mx-auto px-6 lg:px-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div>
            <p className="eyebrow mb-3" style={{color:'#2E5E44'}}>Follow on LinkedIn</p>
            <p className="font-serif text-display-sm max-w-[36ch]" style={{color:'#1F3D2B'}}>
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
