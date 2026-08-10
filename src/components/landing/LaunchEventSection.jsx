export default function LaunchEventSection() {
  return (
    <section
      className="section koaus-launch-event"
      id="launch-event"
      data-rail-section
      data-reveal
      aria-labelledby="event-title"
    >
      <div className="shell koaus-launch-event__grid">
        <div className="koaus-launch-event__copy">
          <span className="koaus-event-badge">✦ FIRST VALIDATION PILOT</span>
          <p data-final-i18n="eventLead">미국시장 검증이 처음이신가요?</p>
          <h2 id="event-title" data-final-i18n="eventTitle">
            첫 검증 파트너 혜택으로<br /><em>더 가볍게<br />시작해보세요.</em>
          </h2>
          <p className="koaus-event-description" data-final-i18n="eventBody">
            선착순 3개 브랜드에 KoaUS 운영관리비 20% 할인(최대 60만 원)과
            Product Scan 사전 진단 혜택을 제공합니다.
          </p>
          <button
            className="button button--dark koaus-plan-select"
            type="button"
            data-plan="Validation - First Validation Pilot"
            data-final-i18n="eventCta"
          >
            검증 파일럿 혜택 받기
          </button>
        </div>
        <article className="koaus-event-card">
          <div className="koaus-event-card__top">
            <div>
              <span>VALIDATION PACKAGE</span>
              <h3 data-final-i18n="eventCardTitle">
                첫 검증 파트너 운영관리비 20% 할인
              </h3>
            </div>
            <span className="koaus-event-roundel">LIMITED<br />3 BRANDS</span>
          </div>
          <div className="koaus-event-price">
            <strong data-final-i18n="eventDiscountLabel"
              >운영관리비 20% 할인</strong
            ><small data-final-i18n="eventDiscountCap">최대 60만 원</small>
          </div>
          <div className="koaus-event-benefits">
            <ul>
              <li data-final-i18n="event1">Product Scan 1회</li>
              <li data-final-i18n="event2">Creative &amp; Demand Test 실행</li>
              <li data-final-i18n="event3">UGC / Short-form Creative 포함</li>
              <li data-final-i18n="event4">CTR·CPC·구매의향 측정</li>
            </ul>
            <ul>
              <li data-final-i18n="event5">소량 배송·VOC 수집</li>
              <li data-final-i18n="event6">물류비·예상 마진 분석</li>
              <li data-final-i18n="event7">US Market Validation Report</li>
              <li data-final-i18n="event8">전략 미팅 1회</li>
            </ul>
          </div>
          <p data-final-i18n="eventNote">
            할인은 KoaUS 운영관리비에만 적용되며 최대 60만 원까지입니다.
            제품 제공비, 배송·관세, 광고 집행비는 제외됩니다.
          </p>
        </article>
      </div>
    </section>
  );
}
