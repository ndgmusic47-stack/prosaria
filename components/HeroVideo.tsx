'use client'

import { useEffect, useRef } from 'react'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // Required sequence for iOS Safari autoplay
    v.setAttribute('playsinline', '')
    v.setAttribute('webkit-playsinline', '')
    v.muted = true
    v.volume = 0
    v.load()
    const play = () => { v.play().catch(() => {}) }
    if (v.readyState >= 2) {
      play()
    } else {
      v.addEventListener('loadeddata', play, { once: true })
      v.addEventListener('canplay', play, { once: true })
    }
  }, [])

  return (
    <div className="absolute inset-0" style={{zIndex:0}}>

      {/* Navy base — instant, no flash */}
      <div className="absolute inset-0 bg-[#050d1a]" />

      {/* Video — plays on all devices including iOS */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        x-webkit-airplay="deny"
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover"
        style={{pointerEvents:'none'}}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay — light so video pops, text stays readable */}
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
