'use client'

import { useEffect, useRef, useState } from 'react'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    // Detect iOS — Safari blocks background video autoplay
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(ios)

    if (!ios) {
      const v = videoRef.current
      if (!v) return
      v.muted = true
      const playPromise = v.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {})
      }
    }
  }, [])

  const overlay = (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 2,
        background: `linear-gradient(
          180deg,
          rgba(5,13,26,0.55) 0%,
          rgba(5,13,26,0.10) 45%,
          rgba(5,13,26,0.10) 60%,
          rgba(5,13,26,0.92) 100%
        )`
      }}
    />
  )

  // iOS — static image background, looks identical
  if (isIOS) {
    return (
      <div className="absolute inset-0" style={{zIndex:0}}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage:'url(/hero-bg.jpg)'}}
        />
        {overlay}
      </div>
    )
  }

  // All other devices — video
  return (
    <div className="absolute inset-0" style={{zIndex:0}}>
      {/* Navy base — no flash while video loads */}
      <div className="absolute inset-0 bg-[#050d1a]" style={{zIndex:0}} />

      {/* Static image shows until video is ready */}
      {!videoLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{backgroundImage:'url(/hero-bg.jpg)',zIndex:1}}
        />
      )}

      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onCanPlay={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{zIndex:1, pointerEvents:'none', opacity: videoLoaded ? 1 : 0, transition:'opacity 0.5s ease'}}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {overlay}
    </div>
  )
}
