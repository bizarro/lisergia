import { Html } from "@elysiajs/html"
import { SanityFileSource } from "@sanity/asset-utils"
import { PageData } from "@utilities/data"

interface MediaProps {
  media: SanityFileSource
  getFile: PageData['getFile']
}

const Media = ({ media, getFile }: MediaProps) => {
  const asset = getFile(media)

  return (
    <figure class="media">
      <video
        autoplay
        class="media__video"
        loop
        muted
        data-src={asset.url}
        {...({ playsinline: true } as any)}
      ></video>
    </figure>
  )
}

export default Media
