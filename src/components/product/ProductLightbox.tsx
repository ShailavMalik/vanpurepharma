import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import { product } from '../../data/product'

interface ProductLightboxProps {
  open: boolean
  onClose: () => void
}

export default function ProductLightbox({ open, onClose }: ProductLightboxProps) {
  const { box } = product.media
  return (
    <Lightbox
      open={open}
      close={onClose}
      plugins={[Zoom]}
      slides={[{ src: '/media/product/multashva-box-1600.png', width: box.width, height: box.height, alt: box.alt }]}
      carousel={{ finite: true }}
      render={{ buttonPrev: () => null, buttonNext: () => null }}
      zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true, doubleTapDelay: 300 }}
      controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
      styles={{ container: { backgroundColor: 'rgba(6, 11, 9, 0.92)', backdropFilter: 'blur(12px)' } }}
    />
  )
}
