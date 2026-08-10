import { useEffect } from 'react'
import Header from '../components/layout/Header.jsx'
import Footer from '../components/layout/Footer.jsx'
import HeroSection from '../components/landing/HeroSection.jsx'
import ProblemSection from '../components/landing/ProblemSection.jsx'
import SolutionSection from '../components/landing/SolutionSection.jsx'
import ProcessSection from '../components/landing/ProcessSection.jsx'
import ReportSection from '../components/landing/ReportSection.jsx'
import PricingSection from '../components/landing/PricingSection.jsx'
import LaunchEventSection from '../components/landing/LaunchEventSection.jsx'
import InquirySection from '../components/landing/InquirySection.jsx'

export default function LandingPage() {
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

    const header = document.querySelector('.site-header')
    const syncHeaderOffset = () => {
      if (!header) return
      const height = Math.ceil(header.getBoundingClientRect().height)
      document.documentElement.style.setProperty('--koaus-header-offset', `${height}px`)
    }
    syncHeaderOffset()
    window.addEventListener('resize', syncHeaderOffset)
    cleanups.push(() => window.removeEventListener('resize', syncHeaderOffset))

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

    const menuButton = document.querySelector('.menu-toggle')
    const mobileMenu = document.querySelector('.mobile-menu')
    const onMenuClick = () => {
      if (!menuButton || !mobileMenu) return
      const open = menuButton.getAttribute('aria-expanded') === 'true'
      menuButton.setAttribute('aria-expanded', String(!open))
      mobileMenu.hidden = open
    }
    const onMobileLinkClick = () => {
      if (!menuButton || !mobileMenu) return
      menuButton.setAttribute('aria-expanded', 'false')
      mobileMenu.hidden = true
    }
    menuButton?.addEventListener('click', onMenuClick)
    const mobileLinks = mobileMenu ? [...mobileMenu.querySelectorAll('a')] : []
    mobileLinks.forEach((link) => link.addEventListener('click', onMobileLinkClick))
    cleanups.push(() => {
      menuButton?.removeEventListener('click', onMenuClick)
      mobileLinks.forEach((link) => link.removeEventListener('click', onMobileLinkClick))
    })

    const tabs = [...document.querySelectorAll('.koaus-detail-tab')]
    const panels = [...document.querySelectorAll('.koaus-tab-panel')]
    const activateTab = (tab) => {
      tabs.forEach((item) => {
        const active = item === tab
        item.classList.toggle('is-active', active)
        item.setAttribute('aria-selected', String(active))
        item.tabIndex = active ? 0 : -1
      })
      panels.forEach((panel) => {
        const active = panel.id === tab.getAttribute('aria-controls')
        panel.hidden = !active
        panel.classList.toggle('is-active', active)
      })
    }
    tabs.forEach((tab, index) => {
      const onClick = () => activateTab(tab)
      const onKeyDown = (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
        event.preventDefault()
        let nextIndex = index
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length
        if (event.key === 'Home') nextIndex = 0
        if (event.key === 'End') nextIndex = tabs.length - 1
        activateTab(tabs[nextIndex])
        tabs[nextIndex].focus()
      }
      tab.addEventListener('click', onClick)
      tab.addEventListener('keydown', onKeyDown)
      cleanups.push(() => {
        tab.removeEventListener('click', onClick)
        tab.removeEventListener('keydown', onKeyDown)
      })
    })

    const selectedPlan = document.querySelector('#selected-plan')
    const inquirySelect = document.querySelector('#inquiry-type')
    const contactSection = document.querySelector('#contact')
    const firstContactField = document.querySelector('#brand-name')
    document.querySelectorAll('.koaus-plan-select').forEach((button) => {
      const onClick = () => {
        if (selectedPlan) selectedPlan.value = button.dataset.plan || ''
        if (inquirySelect) inquirySelect.value = 'market-validation'
        contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        window.setTimeout(() => firstContactField?.focus({ preventScroll: true }), 650)
      }
      button.addEventListener('click', onClick)
      cleanups.push(() => button.removeEventListener('click', onClick))
    })

    const processTimeline = document.querySelector('.process-timeline')
    const processNodes = [...document.querySelectorAll('.process-node')]
    const processPanels = [...document.querySelectorAll('.process-detail')]
    const activateProcessStep = (nextIndex, { focus = false } = {}) => {
      if (!processTimeline || !processNodes.length) return
      const index = Math.max(0, Math.min(nextIndex, processNodes.length - 1))
      processTimeline.style.setProperty('--process-active', String(index))
      processNodes.forEach((node, nodeIndex) => {
        const active = nodeIndex === index
        node.classList.toggle('is-active', active)
        node.setAttribute('aria-selected', String(active))
        node.tabIndex = active ? 0 : -1
        if (active && focus) node.focus()
      })
      processPanels.forEach((panel, panelIndex) => {
        const active = panelIndex === index
        panel.hidden = !active
        panel.classList.toggle('is-active', active)
      })
    }
    processNodes.forEach((node, index) => {
      const onClick = () => activateProcessStep(index)
      const onKeyDown = (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
        event.preventDefault()
        let nextIndex = index
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % processNodes.length
        if (event.key === 'ArrowLeft') {
          nextIndex = (index - 1 + processNodes.length) % processNodes.length
        }
        if (event.key === 'Home') nextIndex = 0
        if (event.key === 'End') nextIndex = processNodes.length - 1
        activateProcessStep(nextIndex, { focus: true })
      }
      node.addEventListener('click', onClick)
      node.addEventListener('keydown', onKeyDown)
      cleanups.push(() => {
        node.removeEventListener('click', onClick)
        node.removeEventListener('keydown', onKeyDown)
      })
    })

    const railLinks = [...document.querySelectorAll('.section-rail a[data-rail-target]')]
    const railSections = railLinks
      .map((link) => document.getElementById(link.dataset.railTarget))
      .filter(Boolean)
    let railTicking = false
    const updateSectionRail = () => {
      railTicking = false
      if (!railLinks.length || !railSections.length) return
      const marker = window.scrollY + window.innerHeight * 0.44
      let activeSection = railSections[0]
      railSections.forEach((section) => {
        if (section.offsetTop <= marker) activeSection = section
      })
      railLinks.forEach((link) => {
        const active = link.dataset.railTarget === activeSection.id
        link.classList.toggle('is-active', active)
        if (active) link.setAttribute('aria-current', 'location')
        else link.removeAttribute('aria-current')
      })
    }
    const requestRailUpdate = () => {
      if (railTicking) return
      railTicking = true
      window.requestAnimationFrame(updateSectionRail)
    }
    window.addEventListener('scroll', requestRailUpdate, { passive: true })
    window.addEventListener('resize', requestRailUpdate)
    railLinks.forEach((link) => link.addEventListener('click', requestRailUpdate))
    updateSectionRail()
    cleanups.push(() => {
      window.removeEventListener('scroll', requestRailUpdate)
      window.removeEventListener('resize', requestRailUpdate)
      railLinks.forEach((link) => link.removeEventListener('click', requestRailUpdate))
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content" data-i18n="skip">
        본문으로 바로가기
      </a>
      <Header />

      <nav className="section-rail" aria-label="Section navigation">
        <a
          className="is-active"
          href="#intro"
          data-rail-target="intro"
          aria-current="location"
        >
          <span className="section-rail__label" data-final-i18n="railIntro">
            시작
          </span>
          <span className="section-rail__number">01</span>
          <span className="section-rail__line" aria-hidden="true"></span>
        </a>
        <a href="#services" data-rail-target="services">
          <span className="section-rail__label" data-final-i18n="railSolution">
            문제 → 검증
          </span>
          <span className="section-rail__number">02</span>
          <span className="section-rail__line" aria-hidden="true"></span>
        </a>
        <a href="#process" data-rail-target="process">
          <span className="section-rail__label" data-final-i18n="railProcess">
            검증 → 결정
          </span>
          <span className="section-rail__number">03</span>
          <span className="section-rail__line" aria-hidden="true"></span>
        </a>
        <a href="#pricing" data-rail-target="pricing">
          <span className="section-rail__label" data-final-i18n="railPricing">
            패키지
          </span>
          <span className="section-rail__number">04</span>
          <span className="section-rail__line" aria-hidden="true"></span>
        </a>
        <a href="#launch-event" data-rail-target="launch-event">
          <span className="section-rail__label" data-final-i18n="railBenefit">
            첫 검증 혜택
          </span>
          <span className="section-rail__number">05</span>
          <span className="section-rail__line" aria-hidden="true"></span>
        </a>
        <a href="#contact" data-rail-target="contact">
          <span className="section-rail__label" data-final-i18n="railContact">
            검증 문의
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

        <section
          className="section pilot-decision-section"
          id="process"
          data-rail-section
          data-reveal
          aria-labelledby="process-title"
        >
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
