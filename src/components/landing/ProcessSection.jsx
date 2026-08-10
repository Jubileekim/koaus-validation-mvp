export default function ProcessSection() {
  return (
    <>
    <header className="pilot-decision-heading">
      <p className="section-kicker" data-final-i18n="processKicker">
        HOW IT WORKS · PILOT TO DECISION
      </p>
      <div className="pilot-decision-heading__copy">
        <h2 id="process-title" data-final-i18n="processTitle">
          4단계로 검증하고,<br /><em>다음 결정을 위한 리포트로 남깁니다.</em>
        </h2>
        <p data-final-i18n="processBody">
          진단부터 실행, 측정까지. 단순 조회수가 아니라 콘텐츠 반응, 고객 참여, 구매 신호를 분석해 다음 액션을 제안합니다.
        </p>
      </div>
    </header>

    <div className="process-timeline-shell">
      <div
        className="process-timeline"
        role="tablist"
        aria-label="Koaus pilot process"
        style={{ '--process-active': '0' }}
      >
        <button
          className="process-node is-active"
          id="process-step-1"
          type="button"
          role="tab"
          aria-selected="true"
          aria-controls="process-detail-1"
          data-process-index="0"
        >
          <span className="process-node__number">01</span>
          <span className="process-node__copy">
            <strong>Diagnose</strong>
            <small data-final-i18n="step1Title">브랜드·제품 진단</small>
          </span>
        </button>
        <button
          className="process-node"
          id="process-step-2"
          type="button"
          role="tab"
          aria-selected="false"
          aria-controls="process-detail-2"
          data-process-index="1"
          tabIndex="-1"
        >
          <span className="process-node__number">02</span>
          <span className="process-node__copy">
            <strong>Match</strong>
            <small data-final-i18n="step2Title">크리에이터 매칭</small>
          </span>
        </button>
        <button
          className="process-node"
          id="process-step-3"
          type="button"
          role="tab"
          aria-selected="false"
          aria-controls="process-detail-3"
          data-process-index="2"
          tabIndex="-1"
        >
          <span className="process-node__number">03</span>
          <span className="process-node__copy">
            <strong>Launch</strong>
            <small data-final-i18n="step3Title">파일럿 실행</small>
          </span>
        </button>
        <button
          className="process-node"
          id="process-step-4"
          type="button"
          role="tab"
          aria-selected="false"
          aria-controls="process-detail-4"
          data-process-index="3"
          tabIndex="-1"
        >
          <span className="process-node__number">04</span>
          <span className="process-node__copy">
            <strong data-final-i18n="measureDecideLabel">Measure &amp; Decide</strong>
            <small data-final-i18n="step4Title">측정과 다음 결정</small>
          </span>
        </button>
      </div>
    </div>

    <div className="process-detail-panels">
      <article
        className="process-detail is-active"
        id="process-detail-1"
        role="tabpanel"
        aria-labelledby="process-step-1"
      >
        <span className="process-detail__number">01</span>
        <div className="process-detail__copy">
          <small>CURRENT STEP</small>
          <h3 data-final-i18n="step1Title">브랜드·제품 진단</h3>
          <p data-final-i18n="step1Body">
            제품·가격·타깃 고객·미국 진출 목표를 확인하고 이번 파일럿에서 검증할 가설을 설정합니다.
          </p>
        </div>
        <div className="process-detail__output">
          <small>OUTPUT</small>
          <strong data-final-i18n="processOutput1">MARKET HYPOTHESIS</strong>
        </div>
      </article>

      <article
        className="process-detail"
        id="process-detail-2"
        role="tabpanel"
        aria-labelledby="process-step-2"
        hidden
      >
        <span className="process-detail__number">02</span>
        <div className="process-detail__copy">
          <small>CURRENT STEP</small>
          <h3 data-final-i18n="step2Title">크리에이터 매칭</h3>
          <p data-final-i18n="step2Body">
            제품 카테고리, 콘텐츠 스타일, 고객 적합도를 기준으로 미국 크리에이터 후보를 선별합니다.
          </p>
        </div>
        <div className="process-detail__output">
          <small>OUTPUT</small>
          <strong data-final-i18n="processOutput2">CURATED CREATOR SHORTLIST</strong>
        </div>
      </article>

      <article
        className="process-detail"
        id="process-detail-3"
        role="tabpanel"
        aria-labelledby="process-step-3"
        hidden
      >
        <span className="process-detail__number">03</span>
        <div className="process-detail__copy">
          <small>CURRENT STEP</small>
          <h3 data-final-i18n="step3Title">파일럿 실행</h3>
          <p data-final-i18n="step3Body">
            제품 발송, 콘텐츠 가이드, UGC 제작과 게시를 운영하고 클릭과 쿠폰을 추적합니다.
          </p>
        </div>
        <div className="process-detail__output">
          <small>OUTPUT</small>
          <strong data-final-i18n="processOutput3">LIVE MARKET PILOT</strong>
        </div>
      </article>

      <article
        className="process-detail"
        id="process-detail-4"
        role="tabpanel"
        aria-labelledby="process-step-4"
        hidden
      >
        <span className="process-detail__number">04</span>
        <div className="process-detail__copy">
          <small>CURRENT STEP</small>
          <h3 data-final-i18n="step4Title">측정과 다음 결정</h3>
          <p data-final-i18n="step4Body">
            콘텐츠 반응과 구매 신호를 분석해 계속할 것, 바꿀 것, 다음에 테스트할 것을 정리합니다.
          </p>
        </div>
        <div className="process-detail__output">
          <small>OUTPUT</small>
          <strong data-final-i18n="processOutput4">U.S. MARKET DECISION REPORT</strong>
        </div>
      </article>
    </div>
    </>
  );
}
