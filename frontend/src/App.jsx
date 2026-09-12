import { useLayoutEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Capabilities from './components/Capabilities'
import Marquee from './components/Marquee'
import Showcase from './components/Showcase'
import Cta from './components/Cta'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import { ThemeProvider } from './hooks/useTheme'

export default function App() {
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <ThemeProvider>
      <a className="absolute left-3 top-3 z-80 translate-y-[-160%] bg-(--accent) px-[0.8rem] py-[0.55rem] text-(--accent-text) transition-transform focus:translate-y-0 focus-visible:rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2 focus-visible:ring-offset-(--bg)" href="#top">
        Skip to content
      </a>
      <div className="relative">
        <Navbar />
        <main className="relative z-1">
          <Hero />
          <Capabilities />
          <Marquee />
          <Showcase />
          <Cta />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </ThemeProvider>
  )
}
