export default function ProcessSection() {
  return (
    <>
    <header className="pilot-decision-heading">
      <p className="section-kicker" data-final-i18n="processKicker">
        HOW IT WORKS · US MARKET VALIDATION
      </p>
      <div className="pilot-decision-heading__copy">
        <h2 id="process-title" data-final-i18n="processTitle">
          4단계로 검증하고,<br /><em>GO / IMPROVE / STOP을 제안합니다.</em>
        </h2>
        <p data-final-i18n="processBody">
          Product Scan부터 Market Test, Fulfillment &amp; VOC, Validation Report까지.
          시장 반응과 물류비·마진을 함께 보고 다음 투자를 결정합니다.
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
            <strong>Product Scan</strong>
            <small data-final-i18n="step1Title">제품·시장 사전 분석</small>
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
            <strong>Market Test</strong>
            <small data-final-i18n="step2Title">Creative·수요 테스트</small>
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
            <strong>Fulfillment &amp; VOC</strong>
            <small data-final-i18n="step3Title">소량 배송·고객 피드백</small>
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
            <strong data-final-i18n="measureDecideLabel">Validation Report</strong>
            <small data-final-i18n="step4Title">GO / IMPROVE / STOP</small>
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
          <h3 data-final-i18n="step1Title">제품·시장 사전 분석</h3>
          <p data-final-i18n="step1Body">
            제품, 시장, 경쟁상품, 가격, 타깃을 분석해 이번 검증에서 확인할
            가설을 설정합니다.
          </p>
        </div>
        <div className="process-detail__output">
          <small>OUTPUT</small>
          <strong data-final-i18n="processOutput1">PRODUCT / MARKET BRIEF</strong>
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
          <h3 data-final-i18n="step2Title">Creative·수요 테스트</h3>
          <p data-final-i18n="step2Body">
            미국 소비자 대상 Creative 및 광고 반응을 테스트합니다. UGC와 Creator
            콘텐츠를 활용해 메시지와 수요를 검증합니다.
          </p>
        </div>
        <div className="process-detail__output">
          <small>OUTPUT</small>
          <strong data-final-i18n="processOutput2">DEMAND SIGNAL DATA</strong>
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
          <h3 data-final-i18n="step3Title">소량 배송·고객 피드백</h3>
          <p data-final-i18n="step3Body">
            테스트 제품을 소량 배송하고 실제 고객 피드백(VOC)과 물류 비용을
            수집합니다.
          </p>
        </div>
        <div className="process-detail__output">
          <small>OUTPUT</small>
          <strong data-final-i18n="processOutput3">FULFILLMENT + VOC LOG</strong>
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
          <h3 data-final-i18n="step4Title">GO / IMPROVE / STOP</h3>
          <p data-final-i18n="step4Body">
            시장반응, 물류비, 마진을 종합해 GO / IMPROVE / STOP과 다음 액션을
            제안합니다.
          </p>
        </div>
        <div className="process-detail__output">
          <small>OUTPUT</small>
          <strong data-final-i18n="processOutput4">US MARKET VALIDATION REPORT</strong>
        </div>
      </article>
    </div>
    </>
  );
}
