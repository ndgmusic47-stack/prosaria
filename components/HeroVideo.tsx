'use client'

import { useEffect, useRef } from 'react'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {
      // autoplay blocked — video stays hidden, navy bg shows
    })
  }, [])

  return (
    <>
      {/* Navy base — always visible, no flash */}
      <div className="absolute inset-0 bg-[#050d1a]" style={{zIndex:0}} />

      {/* Video — client only, mobile compatible */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{zIndex:1,pointerEvents:'none'}}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay — dark at top for text, lighter mid, dark at base */}
      <div
        className="absolute inset-0"
        style={{
          zIndex:2,
          background:`
            linear-gradient(
              to bottom,
              rgba(5,13,26,0.82) 0%,
              rgba(5,13,26,0.82) 30%,
              rgba(5,13,26,0.25) 55%,
              rgba(5,13,26,0.75) 80%,
              rgba(5,13,26,0.97) 100%
            )
          `,
        }}
      />
    </>
  )
}
