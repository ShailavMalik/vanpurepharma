import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Video from 'yet-another-react-lightbox/plugins/video'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/plugins/counter.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/styles.css'
import type { Product } from '../../data/products'

interface ProductViewerProps {
  product: Product
  index: number
  onClose: () => void
}

/** Full-screen, zoomable viewer over all gallery media, including the film as the last slide. */
export default function ProductViewer({ product, index, onClose }: ProductViewerProps) {
  const slides = [
    ...product.gallery.map((image) => ({ src: image.src, width: image.width, height: image.height, alt: image.alt })),
    {
      type: 'video' as const,
      width: product.video.width,
      height: product.video.height,
      poster: product.video.poster,
      sources: [{ src: product.video.src, type: 'video/mp4' }],
    },
  ]

  return (
    <Lightbox
      open
      index={index}
      close={onClose}
      slides={slides}
      plugins={[Zoom, Thumbnails, Counter, Video]}
      carousel={{ finite: true }}
      zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true, doubleTapDelay: 300 }}
      thumbnails={{ border: 0, borderRadius: 10, padding: 2, gap: 8, width: 56, height: 56 }}
      controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
      styles={{
        container: { background: 'radial-gradient(90% 60% at 50% 40%, #16302a 0%, #08100c 70%)' },
        thumbnailsContainer: { backgroundColor: 'rgba(8,16,12,0.7)' },
        thumbnail: { backgroundColor: '#eaf6f0' },
      }}
    />
  )
}
