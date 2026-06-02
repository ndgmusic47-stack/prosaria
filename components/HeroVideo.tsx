'use client'

export default function HeroVideo() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video — plays if hero.mp4 exists in /public */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{zIndex:0}}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Static image fallback — sits behind video */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:'url(/hero-bg.jpg)',
          zIndex:-1,
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#050d1a]/78" style={{zIndex:1}} />

      {/* Blue glow */}
      <div
        className="absolute inset-0"
        style={{
          background:'radial-gradient(ellipse at 40% 50%, rgba(29,78,216,0.18) 0%, transparent 60%)',
          zIndex:2,
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-[#050d1a] to-transparent"
        style={{zIndex:2}}
      />
    </div>
  )
}
