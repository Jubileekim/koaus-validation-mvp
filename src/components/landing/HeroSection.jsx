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
            US MARKET VALIDATION
          </p>
          <h1 id="hero-title" data-i18n="heroTitle">
            <span className="hero-title-line">미국에 대량으로 보내기 전에,</span>
            <span className="hero-title-line"><em>실제로 팔리고 남는지</em> 먼저 확인하세요.</span>
          </h1>
          <div className="hero-ugc-body hero-validation" data-i18n="heroBody">
            <p className="hero-validation__lead">
              KoaUS는 한국 소비재 제품을 미국 소비자에게 실제로 노출하고
              시장 반응, 고객 피드백, 배송비, 판매원가와 예상 마진까지 검증합니다.
            </p>
            <div className="hero-validation__rows">
              <div><strong>MARKET FIT</strong><span>제품·시장 적합도</span></div>
              <div><strong>CREATIVE</strong><span>수요·메시지 반응 테스트</span></div>
              <div><strong>ECONOMICS</strong><span>배송·VOC·마진 검증</span></div>
            </div>
          </div>

          <div className="hero-actions">
            <a
              className="button button--lime"
              href="#contact"
              data-i18n="heroPrimary"
              >제품 검증 시작하기 →</a
            >
            <a
              className="button button--glass"
              href="#process"
              data-i18n="heroSecondary"
              >샘플 리포트 보기</a
            >
          </div>
        </div>

        <div className="hero-ugc-proof" data-reveal>
          <div>
            <strong>Product Scan</strong>
            <span data-i18n="proofCreators">시장·경쟁·가격 사전 분석</span>
          </div>
          <div>
            <strong>4–8 weeks</strong>
            <span data-i18n="proofDays">검증부터 GO/IMPROVE/STOP까지</span>
          </div>
          <div>
            <strong>Fit → Margin</strong>
            <span data-i18n="proofSystem">반응·배송·원가·마진 연결</span>
          </div>
        </div>
      </div>
    </section>
  );
}
