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
          <span className="koaus-event-badge">✦ FIRST LAUNCH EVENT</span>
          <p data-final-i18n="eventLead">미국 시장 테스트가 처음이신가요?</p>
          <h2 id="event-title" data-final-i18n="eventTitle">
            첫 파트너 혜택으로<br /><em>더 가볍게<br />시작해보세요.</em>
          </h2>
          <p className="koaus-event-description" data-final-i18n="eventBody">
            선착순 3개 브랜드에 Koaus 운영관리비 20% 할인(최대 60만 원)과
            미국 시장 사전 진단 혜택을 제공합니다.
          </p>
          <button
            className="button button--dark koaus-plan-select"
            type="button"
            data-plan="Validation - First Launch Event"
            data-final-i18n="eventCta"
          >
            신규 혜택 받기
          </button>
        </div>
        <article className="koaus-event-card">
          <div className="koaus-event-card__top">
            <div>
              <span>VALIDATION PACKAGE</span>
              <h3 data-final-i18n="eventCardTitle">
                첫 런칭 파트너 운영관리비 20% 할인
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
              <li data-final-i18n="event1">나노·마이크로 8건 게시 보장</li>
              <li data-final-i18n="event2">숏폼 UGC 8건</li>
              <li data-final-i18n="event3">재사용 UGC 원본·편집본 4건</li>
              <li data-final-i18n="event4">콘텐츠별 링크·쿠폰 추적</li>
            </ul>
            <ul>
              <li data-final-i18n="event5">메시지·훅·반응 비교</li>
              <li data-final-i18n="event6">시장 검증 리포트</li>
              <li data-final-i18n="event7">미국 시장 진단 1회</li>
              <li data-final-i18n="event8">전략 미팅 1회</li>
            </ul>
          </div>
          <p data-final-i18n="eventNote">
            할인은 Koaus 운영관리비에만 적용되며 최대 60만 원까지입니다.
            크리에이터 보상, 제품·배송·관세·광고 집행비는 제외됩니다.
          </p>
        </article>
      </div>
    </section>
  );
}
