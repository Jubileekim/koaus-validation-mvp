export default function SolutionSection() {
  return (
    <div className="decision-lanes" aria-label="문제와 Koaus 해결 방식">
      <article className="decision-lane decision-lane--creator">
        <div className="decision-problem">
          <div className="decision-problem__meta">
            <span>01</span><small>Customer Uncertainty</small>
          </div>
          <h3 data-final-i18n="problem1Title">
            누가 우리 제품을 살지 모릅니다.
          </h3>
          <p data-final-i18n="problem1Body">
            미국의 어떤 고객층이 제품에 관심을 보이고 구매 이유를 느끼는지
            확인하기 어렵습니다.
          </p>
        </div>
        <div className="decision-connector" aria-hidden="true"><span>→</span></div>
        <div className="decision-solution">
          <span className="decision-solution__type">CREATOR</span>
          <h3 data-final-i18n="service1Title">
            제품과 고객에 맞는 미국 크리에이터를 선별합니다.
          </h3>
          <ul>
            <li data-final-i18n="service1a">제품·카테고리 적합도 검토</li>
            <li data-final-i18n="service1b">미국 크리에이터 후보 선별</li>
            <li data-final-i18n="service1c">영문 브리프와 커뮤니케이션</li>
            <li data-final-i18n="service1d">배송·일정·납품 관리</li>
          </ul>
        </div>
      </article>

      <article className="decision-lane decision-lane--ugc">
        <div className="decision-problem">
          <div className="decision-problem__meta">
            <span>02</span><small>Content Uncertainty</small>
          </div>
          <h3 data-final-i18n="problem2Title">
            어떤 콘텐츠가 통할지 모릅니다.
          </h3>
          <p data-final-i18n="problem2Body">
            한국에서 쓰던 메시지와 표현이 미국 소비자의 관심과 신뢰를
            만들지는 별개의 문제입니다.
          </p>
        </div>
        <div className="decision-connector" aria-hidden="true"><span>→</span></div>
        <div className="decision-solution">
          <span className="decision-solution__type">UGC</span>
          <h3 data-final-i18n="service2Title">
            미국 소비자의 언어와 시선으로 콘텐츠를 만듭니다.
          </h3>
          <ul>
            <li data-final-i18n="service2a">제품 사용·시연 숏폼</li>
            <li data-final-i18n="service2b">후킹과 메시지별 콘텐츠</li>
            <li data-final-i18n="service2c">브랜드 채널 활용 소재</li>
            <li data-final-i18n="service2d">사용권·원본 파일 옵션</li>
          </ul>
        </div>
      </article>

      <article className="decision-lane decision-lane--commerce">
        <div className="decision-problem">
          <div className="decision-problem__meta">
            <span>03</span><small>Commerce Uncertainty</small>
          </div>
          <h3 data-final-i18n="problem3Title">
            관심이 구매로 이어질지 모릅니다.
          </h3>
          <p data-final-i18n="problem3Body">
            조회와 좋아요가 실제 클릭·쿠폰 사용·주문으로 연결되는지 확인하기
            전에 비용이 먼저 들어갑니다.
          </p>
        </div>
        <div className="decision-connector" aria-hidden="true"><span>→</span></div>
        <div className="decision-solution">
          <span className="decision-solution__type">COMMERCE</span>
          <h3 data-final-i18n="service3Title">
            클릭·쿠폰·주문 데이터를 통해 구매 가능성을 확인합니다.
          </h3>
          <ul>
            <li data-final-i18n="service3a">추적 링크와 쿠폰 설정</li>
            <li data-final-i18n="service3b">콘텐츠별 반응 비교</li>
            <li data-final-i18n="service3c">초기 구매 신호 확인</li>
            <li data-final-i18n="service3d">확대·수정·중단 권고안</li>
          </ul>
        </div>
      </article>
    </div>
  );
}
