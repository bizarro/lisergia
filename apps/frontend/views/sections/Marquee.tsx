import { Html } from "@elysiajs/html"

interface MarqueeProps {
  title: string
}

const Marquee = ({ title }: MarqueeProps) => {
  return (
    <div class="marquee">
      <div class="marquee__wrapper">
        {Array.from({ length: 10 }, () => (
          <span>{title}&nbsp;</span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
