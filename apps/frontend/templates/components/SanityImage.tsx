import type { JSX } from 'preact'

import { getAsset } from '../helpers'
import type { SanityImageSource } from '../types'

type SanityImageProps = Omit<JSX.IntrinsicElements['img'], 'alt' | 'data-src' | 'fetchPriority' | 'loading' | 'src'> & {
  fallbackAlt?: string
  image: SanityImageSource
  priority?: boolean
}

export default function SanityImage({
  className,
  fallbackAlt = '',
  image,
  priority = false,
  ...props
}: SanityImageProps) {
  const asset = getAsset(image)
  const alt = asset.alt || fallbackAlt.trim()

  if (priority) {
    return (
      <img
        {...props}
        alt={alt}
        className={`${className ?? ''} loaded`.trim()}
        decoding="async"
        fetchPriority="high"
        loading="eager"
        src={asset.url}
      />
    )
  }

  return <img {...props} alt={alt} className={className} data-src={asset.url} decoding="async" loading="lazy" />
}
