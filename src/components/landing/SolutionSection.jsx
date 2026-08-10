export default function SolutionSection() {
  return (
    <div className="decision-lanes" aria-label="문제와 Koaus 해결 방식">
      <article className="decision-lane decision-lane--creator">
        <div className="decision-problem">
          <div className="decision-problem__meta">
            <span>01</span><small>Market Uncertainty</small>
          </div>
          <h3 data-final-i18n="problem1Title">
            미국에서도 팔릴 제품인지 모릅니다.
          </h3>
          <p data-final-i18n="problem1Body">
            경쟁 상품, 타깃 고객, 권장 판매가격, 핵심 구매 메시지를 확인하기
            전에 시장에 진입하기 쉽습니다.
          </p>
        </div>
        <div className="decision-connector" aria-hidden="true"><span>→</span></div>
        <div className="decision-solution">
          <span className="decision-solution__type">MARKET FIT</span>
          <h3 data-final-i18n="service1Title">
            제품과 시장의 적합도를 먼저 정리합니다.
          </h3>
          <ul>
            <li data-final-i18n="service1a">미국 경쟁상품 분석</li>
            <li data-final-i18n="service1b">타깃 고객 정의</li>
            <li data-final-i18n="service1c">권장 판매가격 검토</li>
            <li data-final-i18n="service1d">핵심 구매 메시지 도출</li>
          </ul>
        </div>
      </article>

      <article className="decision-lane decision-lane--ugc">
        <div className="decision-problem">
          <div className="decision-problem__meta">
            <span>02</span><small>Demand Uncertainty</small>
          </div>
          <h3 data-final-i18n="problem2Title">
            어떤 메시지가 수요를 만들지 모릅니다.
          </h3>
          <p data-final-i18n="problem2Body">
            한국에서 쓰던 표현이 미국 소비자의 클릭과 구매의향으로 이어지는지는
            별개의 문제입니다.
          </p>
        </div>
        <div className="decision-connector" aria-hidden="true"><span>→</span></div>
        <div className="decision-solution">
          <span className="decision-solution__type">CREATIVE &amp; DEMAND</span>
          <h3 data-final-i18n="service2Title">
            미국 소비자용 Creative로 수요를 테스트합니다.
          </h3>
          <ul>
            <li data-final-i18n="service2a">미국 소비자용 메시지 테스트</li>
            <li data-final-i18n="service2b">UGC / Short-form Creative 실행</li>
            <li data-final-i18n="service2c">Creator 콘텐츠를 통한 수요 검증</li>
            <li data-final-i18n="service2d">CTR / CPC / 구매의향 반응 측정</li>
          </ul>
        </div>
      </article>

      <article className="decision-lane decision-lane--commerce">
        <div className="decision-problem">
          <div className="decision-problem__meta">
            <span>03</span><small>Economics Uncertainty</small>
          </div>
          <h3 data-final-i18n="problem3Title">
            팔려도 돈이 남는지 모릅니다.
          </h3>
          <p data-final-i18n="problem3Body">
            관심과 클릭이 있어도 배송비, 판매원가, CAC, 예상 마진을 확인하기
            전에는 본격 투자가 위험합니다.
          </p>
        </div>
        <div className="decision-connector" aria-hidden="true"><span>→</span></div>
        <div className="decision-solution">
          <span className="decision-solution__type">FULFILLMENT &amp; ECONOMICS</span>
          <h3 data-final-i18n="service3Title">
            소량 배송·VOC·원가로 수익성을 확인합니다.
          </h3>
          <ul>
            <li data-final-i18n="service3a">테스트 제품 소량 배송</li>
            <li data-final-i18n="service3b">실제 고객 VOC 수집</li>
            <li data-final-i18n="service3c">실제 물류비 계산</li>
            <li data-final-i18n="service3d">판매원가 / CAC / 예상 마진 분석</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
