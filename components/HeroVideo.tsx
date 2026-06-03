'use client'

import { useEffect, useRef } from 'react'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])

  return (
    <div className="absolute inset-0" style={{zIndex:0}}>
      {/* Navy base — instant load, no flash */}
      <div className="absolute inset-0 bg-[#050d1a]" />

      {/* Video — faststart encoded, plays on mobile */}
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

      {/* Minimal overlay — just enough to read text, video stays vivid */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(5,13,26,0.55) 0%,
            rgba(5,13,26,0.10) 45%,
            rgba(5,13,26,0.10) 60%,
            rgba(5,13,26,0.90) 100%
          )`
        }}
      />
    </div>
  )
}
