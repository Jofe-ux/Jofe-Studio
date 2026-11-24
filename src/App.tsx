import { useI18n } from '@/i18n/I18nProvider'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Hero } from '@/sections/Hero'
import { StatusStrip } from '@/sections/StatusStrip'
import { Projects } from '@/sections/Projects'
import { About } from '@/sections/About'
import { Technologies } from '@/sections/Technologies'
import { Contact } from '@/sections/Contact'

export default function App() {
  const { t } = useI18n()
  return (
    <>
      <a
        href="#proyectos"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        {t.a11y.skip}
      </a>
      <Navbar />
      <main>
        <Hero />
        <StatusStrip />
        <Projects />
        <About />
        <Technologies />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
