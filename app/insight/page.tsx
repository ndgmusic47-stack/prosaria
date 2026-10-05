import { permanentRedirect } from 'next/navigation'

// Insights is retired for now. Old article URLs are caught by the catch-all
// below this route and sent here, which forwards to the homepage.
export default function InsightRedirect() {
  permanentRedirect('/')
}
