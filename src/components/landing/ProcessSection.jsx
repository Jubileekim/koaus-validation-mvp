import { useRef, useState } from 'react'
import { useTranslation } from '../../contexts/LocaleContext.jsx'

const STEPS = [
  {
    number: '01',
    name: 'process.n1',
    summary: 'process.n1s',
    title: 'process.d1Title',
    body: 'process.d1Body',
    output: 'process.d1Out',
  },
  {
    number: '02',
    name: 'process.n2',
    summary: 'process.n2s',
    title: 'process.d2Title',
    body: 'process.d2Body',
    output: 'process.d2Out',
  },
  {
    number: '03',
    name: 'process.n3',
    summary: 'process.n3s',
    title: 'process.d3Title',
    body: 'process.d3Body',
    output: 'process.d3Out',
  },
  {
    number: '04',
    name: 'process.n4',
    summary: 'process.n4s',
    title: 'process.d4Title',
    body: 'process.d4Body',
    output: 'process.d4Out',
  },
]

export default function ProcessSection() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const nodeRefs = useRef([])

  const activateStep = (nextIndex, focus = false) => {
    const normalizedIndex = Math.max(0, Math.min(nextIndex, STEPS.length - 1))
    setActiveIndex(normalizedIndex)
    if (focus) {
      window.requestAnimationFrame(() => nodeRefs.current[normalizedIndex]?.focus())
    }
  }

  const handleKeyDown = (event, index) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()

    let nextIndex = index
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % STEPS.length
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + STEPS.length) % STEPS.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = STEPS.length - 1
    activateStep(nextIndex, true)
  }

  return (
    <>
      <header className="pilot-decision-heading">
        <p className="section-kicker">{t('process.kicker')}</p>
        <div className="pilot-decision-heading__copy">
          <h2 id="process-title">
            {t('process.title1')}
            <br />
            <em>{t('process.titleEm')}</em>
          </h2>
          <p>{t('process.body')}</p>
        </div>
      </header>

      <div className="process-timeline-shell">
        <div
          className="process-timeline"
          role="tablist"
          aria-label={t('process.aria')}
          style={{ '--process-active': String(activeIndex) }}
        >
          {STEPS.map((step, index) => {
            const active = index === activeIndex
            return (
              <button
                className={`process-node${active ? ' is-active' : ''}`}
                id={`process-step-${index + 1}`}
                key={step.number}
                ref={(node) => {
                  nodeRefs.current[index] = node
                }}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`process-detail-${index + 1}`}
                tabIndex={active ? 0 : -1}
                onClick={() => activateStep(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span className="process-node__number">{step.number}</span>
                <span className="process-node__copy">
                  <strong>{t(step.name)}</strong>
                  <small>{t(step.summary)}</small>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="process-detail-panels">
        {STEPS.map((step, index) => {
          const active = index === activeIndex
          return (
            <article
              className={`process-detail${active ? ' is-active' : ''}`}
              id={`process-detail-${index + 1}`}
              key={step.number}
              role="tabpanel"
              aria-labelledby={`process-step-${index + 1}`}
              hidden={!active}
            >
              <span className="process-detail__number">{step.number}</span>
              <div className="process-detail__copy">
                <small>{t('process.current')}</small>
                <h3>{t(step.title)}</h3>
                <p>{t(step.body)}</p>
              </div>
              <div className="process-detail__output">
                <small>{t('process.output')}</small>
                <strong>{t(step.output)}</strong>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}
