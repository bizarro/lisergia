import { getFile } from '../helpers'
import type { MediaSection } from '../types'

export default function Media({ section }: { section: MediaSection }) {
  const asset = getFile(section.media)

  return (
    <figure className="media">
      <video autoPlay className="media__video" loop muted playsInline data-src={asset.url} />
    </figure>
  )
}
