'use client'

import { useEffect, useRef } from 'react'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    v.muted = true
    v.volume = 0

    const attempt = () => {
      v.play().catch(() => {})
    }

    // Try immediately
    attempt()

    // Try again when page becomes visible (handles iOS back-navigation)
    const onVisible = () => {
      if (document.visibilityState === 'visible') attempt()
    }
    document.addEventListener('visibilitychange', onVisible)

    // Try on first user touch — iOS requires this for first-load autoplay
    const onTouch = () => {
      attempt()
      document.removeEventListener('touchstart', onTouch)
      document.removeEventListener('touchend', onTouch)
    }
    document.addEventListener('touchstart', onTouch, { passive: true })
    document.addEventListener('touchend', onTouch, { passive: true })

    // Try when video has enough data
    v.addEventListener('canplay', attempt, { once: true })

    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      document.removeEventListener('touchstart', onTouch)
      document.removeEventListener('touchend', onTouch)
    }
  }, [])

  return (
    <div className="absolute inset-0" style={{zIndex:0}}>
      <div className="absolute inset-0 bg-[#050d1a]" />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{pointerEvents:'none'}}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          background:`linear-gradient(
            180deg,
            rgba(5,13,26,0.55) 0%,
            rgba(5,13,26,0.08) 40%,
            rgba(5,13,26,0.08) 60%,
            rgba(5,13,26,0.92) 100%
          )`
        }}
      />
    </div>
  )
}
