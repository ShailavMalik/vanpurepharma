import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import type { ProductImage } from '../../data/products'

interface ProductLightboxProps {
  image: ProductImage
  open: boolean
  onClose: () => void
}

export default function ProductLightbox({ image, open, onClose }: ProductLightboxProps) {
  return (
    <Lightbox
      open={open}
      close={onClose}
      plugins={[Zoom]}
      slides={[{ src: image.src, width: image.width, height: image.height, alt: image.alt }]}
      carousel={{ finite: true }}
      render={{ buttonPrev: () => null, buttonNext: () => null }}
      zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true, doubleTapDelay: 300 }}
      controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
      styles={{ container: { backgroundColor: 'rgba(6, 11, 9, 0.92)', backdropFilter: 'blur(12px)' } }}
    />
  )
}
