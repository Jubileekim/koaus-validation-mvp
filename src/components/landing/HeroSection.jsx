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
          <p className="eyebrow" data-i18n="heroEyebrow">
            미국 진출 전, 먼저 검증하세요
          </p>
          <h1 id="hero-title" data-i18n="heroTitle">
            <span className="hero-title-line">끝없이 커지는 미국 시장,</span>
            <span className="hero-title-line"><em>우리 브랜드도</em> 통할까요?</span>
          </h1>
          <div className="hero-ugc-body hero-validation" data-i18n="heroBody">
            <p className="hero-validation__lead">큰 비용과 재고를 먼저 투입하기 전에</p>
            <div className="hero-validation__rows">
              <div><strong>CREATOR</strong><span>제품 적합도 확인</span></div>
              <div><strong>UGC</strong><span>고객 반응 측정</span></div>
              <div><strong>COMMERCE</strong><span>실제 구매 가능성 검증</span></div>
            </div>
          </div>

          <div className="hero-actions">
            <a
              className="button button--lime"
              href="#contact"
              data-i18n="heroPrimary"
              >미국 런칭 문의 →</a
            >
            <a
              className="button button--glass"
              href="#services"
              data-i18n="heroSecondary"
              >서비스 보기</a
            >
          </div>
        </div>

        <div className="hero-ugc-proof" data-reveal>
          <div>
            <strong>5–12</strong>
            <span data-i18n="proofCreators">패키지별 미국 크리에이터</span>
          </div>
          <div>
            <strong>4–8 weeks</strong>
            <span data-i18n="proofDays">진단부터 결과 리포트까지</span>
          </div>
          <div>
            <strong>UGC → Commerce</strong>
            <span data-i18n="proofSystem">콘텐츠·리스팅·런치 연결</span>
          </div>
        </div>
      </div>
    </section>
  );
}
