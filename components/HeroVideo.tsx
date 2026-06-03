'use client'

import { useEffect, useRef } from 'react'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.setAttribute('playsinline', '')
    v.setAttribute('webkit-playsinline', '')
    v.muted = true
    v.volume = 0
    // Do NOT call v.load() — it resets and breaks iOS
    const play = () => { v.play().catch(() => {}) }
    if (v.readyState >= 2) {
      play()
    } else {
      v.addEventListener('loadedmetadata', play, { once: true })
      v.addEventListener('canplay', play, { once: true })
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
        preload="metadata"
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
