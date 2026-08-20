import { useEffect, useState } from 'react'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'
import HeroSection from '../components/landing/HeroSection.jsx'
import ProblemSection from '../components/landing/ProblemSection.jsx'
import SolutionSection from '../components/landing/SolutionSection.jsx'
import MarketplacePreviewSection from '../components/landing/MarketplacePreviewSection.jsx'
import ProcessSection from '../components/landing/ProcessSection.jsx'
import ReportSection from '../components/landing/ReportSection.jsx'
import PricingSection from '../components/landing/PricingSection.jsx'
import LaunchEventSection from '../components/landing/LaunchEventSection.jsx'
import InquirySection from '../components/landing/InquirySection.jsx'
import { useTranslation } from '../contexts/LocaleContext.jsx'

const RAIL_TARGETS = ['intro', 'services', 'process', 'pricing', 'launch-event', 'contact']

export default function LandingPage() {
  const { t } = useTranslation()
  const [activeRailTarget, setActiveRailTarget] = useState('intro')
  // Port original landing JS behaviors needed for visual parity (no redesign).
  useEffect(() => {
    const cleanups = []

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el))
    cleanups.push(() => revealObserver.disconnect())

    const ugcHero = document.querySelector('.hero--ugc')
    const ugcVideos = [...document.querySelectorAll('.hero--ugc video')]
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const setUgcPlayback = (shouldPlay) => {
      ugcVideos.forEach((video) => {
        if (shouldPlay && !reduceMotion.matches) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      })
    }
    if (ugcHero && ugcVideos.length) {
      // React can miss the muted property for autoplay; force it like the static page.
      ugcVideos.forEach((video) => {
        video.muted = true
        video.defaultMuted = true
        video.playsInline = true
        video.setAttribute('playsinline', '')
      })
      const ugcObserver = new IntersectionObserver(
        ([entry]) => setUgcPlayback(entry.isIntersecting),
        { threshold: 0.08 },
      )
      ugcObserver.observe(ugcHero)
      setUgcPlayback(true)
      const onMotionChange = () => setUgcPlayback(!reduceMotion.matches)
      reduceMotion.addEventListener?.('change', onMotionChange)
      cleanups.push(() => {
        ugcObserver.disconnect()
        reduceMotion.removeEventListener?.('change', onMotionChange)
      })
    }

    const railSections = RAIL_TARGETS
      .map((target) => document.getElementById(target))
      .filter(Boolean)
    let railTicking = false
    const updateSectionRail = () => {
      railTicking = false
      if (!railSections.length) return
      const marker = window.scrollY + window.innerHeight * 0.44
      let activeSection = railSections[0]
      railSections.forEach((section) => {
        if (section.offsetTop <= marker) activeSection = section
      })
      setActiveRailTarget(activeSection.id)
    }
    const requestRailUpdate = () => {
      if (railTicking) return
      railTicking = true
      window.requestAnimationFrame(updateSectionRail)
    }
    window.addEventListener('scroll', requestRailUpdate, { passive: true })
    window.addEventListener('resize', requestRailUpdate)
    updateSectionRail()
    cleanups.push(() => {
      window.removeEventListener('scroll', requestRailUpdate)
      window.removeEventListener('resize', requestRailUpdate)
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">
        {t('common.skip')}
      </a>
      <Header />

      <nav className="section-rail" aria-label={t('common.sectionNav')}>
        <a
          className={activeRailTarget === 'intro' ? 'is-active' : undefined}
          href="#intro"
          data-rail-target="intro"
          aria-current={activeRailTarget === 'intro' ? 'location' : undefined}
        >
          <span className="section-rail__label">
            {t('rail.start')}
          </span>
          <span className="section-rail__number">01</span>
          <span className="section-rail__line" aria-hidden="true"></span>
        </a>
        <a
          className={activeRailTarget === 'services' ? 'is-active' : undefined}
          href="#services"
          data-rail-target="services"
          aria-current={activeRailTarget === 'services' ? 'location' : undefined}
        >
          <span className="section-rail__label">
            {t('rail.discover')}
          </span>
          <span className="section-rail__number">02</span>
          <span className="section-rail__line" aria-hidden="true"></span>
        </a>
        <a
          className={activeRailTarget === 'process' ? 'is-active' : undefined}
          href="#process"
          data-rail-target="process"
          aria-current={activeRailTarget === 'process' ? 'location' : undefined}
        >
          <span className="section-rail__label">
            {t('rail.how')}
          </span>
          <span className="section-rail__number">03</span>
          <span className="section-rail__line" aria-hidden="true"></span>
        </a>
        <a
          className={activeRailTarget === 'pricing' ? 'is-active' : undefined}
          href="#pricing"
          data-rail-target="pricing"
          aria-current={activeRailTarget === 'pricing' ? 'location' : undefined}
        >
          <span className="section-rail__label">
            {t('rail.pathways')}
          </span>
          <span className="section-rail__number">04</span>
          <span className="section-rail__line" aria-hidden="true"></span>
        </a>
        <a
          className={activeRailTarget === 'launch-event' ? 'is-active' : undefined}
          href="#launch-event"
          data-rail-target="launch-event"
          aria-current={activeRailTarget === 'launch-event' ? 'location' : undefined}
        >
          <span className="section-rail__label">
            {t('rail.drop')}
          </span>
          <span className="section-rail__number">05</span>
          <span className="section-rail__line" aria-hidden="true"></span>
        </a>
        <a
          className={activeRailTarget === 'contact' ? 'is-active' : undefined}
          href="#contact"
          data-rail-target="contact"
          aria-current={activeRailTarget === 'contact' ? 'location' : undefined}
        >
          <span className="section-rail__label">
            {t('rail.brands')}
          </span>
          <span className="section-rail__number">06</span>
          <span className="section-rail__line" aria-hidden="true"></span>
        </a>
      </nav>

      <main id="main-content">
        <HeroSection />

        <section
          className="section decision-section"
          id="services"
          data-rail-section
          data-reveal
          aria-labelledby="decision-title"
        >
          <span className="anchor-target" id="why" aria-hidden="true"></span>
          <div className="shell">
            <ProblemSection />
            <SolutionSection />
          </div>
        </section>

        <MarketplacePreviewSection />

        <section
          className="section pilot-decision-section"
          id="process"
          data-rail-section
          data-reveal
          aria-labelledby="process-title"
        >
          <span className="anchor-target" id="for-creators" aria-hidden="true"></span>
          <div className="shell pilot-decision-shell">
            <ProcessSection />
            <ReportSection />
          </div>
        </section>

        <PricingSection />
        <LaunchEventSection />
        <InquirySection />
      </main>

      <Footer />
    </>
  );
}
