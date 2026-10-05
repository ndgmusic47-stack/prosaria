import { permanentRedirect } from 'next/navigation'

// Insights is retired for now. Previously published article URLs
// (/insight/<slug>) are permanently redirected to the homepage.
export default function InsightArticleRedirect() {
  permanentRedirect('/')
}
