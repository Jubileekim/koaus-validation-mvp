import { Link } from 'react-router'

export default function HeroSection() {
  return (
    <section className="hero hero--ugc" id="intro" data-rail-section aria-labelledby="hero-title">
      <div className="ugc-mosaic" aria-hidden="true">
        <div
          className="ugc-column ugc-column--1"
          style={{ '--ugc-duration': '28s', '--ugc-direction': 'normal' }}
        >
          <div className="ugc-track">
            <div className="ugc-loop-set">
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-01.mp4" />
                </video>
              </article>
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-02.mp4" />
                </video>
              </article>
            </div>
            <div className="ugc-loop-set">
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-01.mp4" />
                </video>
              </article>
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-02.mp4" />
                </video>
              </article>
            </div>
          </div>
        </div>
        <div
          className="ugc-column ugc-column--2"
          style={{ '--ugc-duration': '34s', '--ugc-direction': 'reverse' }}
        >
          <div className="ugc-track">
            <div className="ugc-loop-set">
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-03.mp4" />
                </video>
              </article>
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-04.mp4" />
                </video>
              </article>
            </div>
            <div className="ugc-loop-set">
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-03.mp4" />
                </video>
              </article>
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-04.mp4" />
                </video>
              </article>
            </div>
          </div>
        </div>
        <div
          className="ugc-column ugc-column--3"
          style={{ '--ugc-duration': '31s', '--ugc-direction': 'normal' }}
        >
          <div className="ugc-track">
            <div className="ugc-loop-set">
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-05.mp4" />
                </video>
              </article>
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-06.mp4" />
                </video>
              </article>
            </div>
            <div className="ugc-loop-set">
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-05.mp4" />
                </video>
              </article>
              <article className="ugc-card" aria-hidden="true">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex="-1"
                >
                  <source src="/assets/videos/hero/ugc-06.mp4" />
                </video>
              </article>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-ugc-shade" aria-hidden="true"></div>

      <div className="shell hero-ugc-inner">
        <div className="hero-ugc-copy" data-reveal>
          <p className="eyebrow">
            KOREAN PRODUCTS × U.S. CREATORS
          </p>
          <h1 id="hero-title">
            <span className="hero-title-line">Discover Korean products</span>
            <span className="hero-title-line">for your next <em>collaboration</em>.</span>
          </h1>
          <div className="hero-ugc-body hero-validation">
            <p className="hero-validation__lead">
              Curated Korean brands, creator-only pricing,
              and collaboration opportunities — all in one place.
            </p>
            <div className="hero-validation__rows">
              <div><strong>DISCOVER</strong><span>Curated Korean products</span></div>
              <div><strong>ACCESS</strong><span>Creator-only pricing and MOQ</span></div>
              <div><strong>COLLABORATE</strong><span>Group Buy, Affiliate, UGC</span></div>
            </div>
          </div>

          <div className="hero-actions">
            <Link className="button button--lime" to="/marketplace">
              Browse Products →
            </Link>
            <Link className="button button--glass" to="/creator-access">
              Get Creator Access
            </Link>
          </div>
        </div>

        <div className="hero-ugc-proof" data-reveal>
          <div>
            <strong>Curated</strong>
            <span>Korean products for U.S. creators</span>
          </div>
          <div>
            <strong>Creator Access</strong>
            <span>Unlock pricing, samples, and terms</span>
          </div>
          <div>
            <strong>Collaborate</strong>
            <span>Group Buy · Affiliate · UGC</span>
          </div>
        </div>
      </div>
    </section>
  );
}
