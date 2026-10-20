import { Outlet } from 'react-router-dom'
import { Blobs } from '../ui/Blobs'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollManager } from './ScrollManager'
import { WhatsAppFab } from './WhatsAppFab'

export function Layout() {
  return (
    <div className="relative flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-green focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Blobs />
      <ScrollManager />
      <Header />
      <main id="main" className="relative flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
