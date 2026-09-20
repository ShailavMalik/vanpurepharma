import { AnimatePresence, motion } from 'motion/react'
import { Outlet, useLocation } from 'react-router-dom'
import { easeOutExpo } from '../../lib/motion'
import { Footer } from './Footer'
import { GradientBlobs } from './GradientBlobs'
import { MobileOrderBar } from './MobileOrderBar'
import { Navbar } from './Navbar'
import { ScrollManager } from './ScrollManager'
import { WhatsAppFab } from './WhatsAppFab'

export function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gradient-brand focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <GradientBlobs />
      <ScrollManager />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: easeOutExpo }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <MobileOrderBar />
      <WhatsAppFab />
    </>
  )
}
