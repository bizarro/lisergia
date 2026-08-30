import type { MarqueeSection } from '../types'

export default function Marquee({ section }: { section: MarqueeSection }) {
  return (
    <div className="marquee">
      <div className="marquee__wrapper">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i}>{section.title}&nbsp;</span>
        ))}
      </div>
    </div>
  )
}
