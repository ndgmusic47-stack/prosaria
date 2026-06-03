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

      {/* Navy base — shows instantly, no flash */}
      <div className="absolute inset-0 bg-[#050d1a]" />

      {/* Video — no poster, JS-triggered play for mobile */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        style={{pointerEvents:'none'}}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay — dark top for text, opens mid, dark base */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(5,13,26,0.85) 0%,
            rgba(5,13,26,0.85) 25%,
            rgba(5,13,26,0.20) 55%,
            rgba(5,13,26,0.70) 80%,
            rgba(5,13,26,0.98) 100%
          )`
        }}
      />

    </div>
  )
}
