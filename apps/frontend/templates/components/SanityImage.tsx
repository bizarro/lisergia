import type { JSX } from 'preact'

import { getAsset } from '../helpers'
import type { SanityImageSource } from '../types'

type SanityImageProps = Omit<
  JSX.IntrinsicElements['img'],
  'alt' | 'data-src' | 'fetchPriority' | 'height' | 'loading' | 'sizes' | 'src' | 'srcSet' | 'width'
> & {
  fallbackAlt?: string
  image: SanityImageSource
  priority?: boolean
  sizes?: string
}

export default function SanityImage({
  className,
  fallbackAlt = '',
  image,
  priority = false,
  sizes = '100vw',
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
        height={asset.height}
        loading="eager"
        sizes={sizes}
        src={asset.url}
        srcSet={asset.srcSet}
        width={asset.width}
      />
    )
  }

  return (
    <img
      {...props}
      alt={alt}
      className={className}
      data-src={asset.url}
      data-srcset={asset.srcSet}
      decoding="async"
      height={asset.height}
      loading="lazy"
      sizes={sizes}
      width={asset.width}
    />
  )
}
