export default function PricingSection() {
  return (
    <section
      className="section koaus-pricing"
      id="pricing"
      data-rail-section
      data-reveal
      aria-labelledby="pricing-title"
    >
      <div className="shell">
        <div className="koaus-pricing__heading">
          <div>
            <p className="section-kicker" data-final-i18n="pricingKicker">
              PRICING · U.S. PILOT
            </p>
            <h2 id="pricing-title" data-final-i18n="pricingTitle">
              미국 파일럿 패키지.
            </h2>
          </div>
          <p data-final-i18n="pricingBody">
            브랜드의 현재 단계에 맞춰 시딩 테스트부터 게시·UGC·구매 신호
            검증까지 선택할 수 있습니다. 패키지 금액은 시작가이며, 산출물
            기준으로 구성합니다.
          </p>
        </div>

        <div className="koaus-pricing__cards">
          <article className="koaus-plan-card">
            <div className="koaus-plan-card__head">
              <span>STARTER · U.S. SEEDING TEST</span>
              <h3 data-final-i18n="starterTitle">미국 시딩 테스트</h3>
              <p data-final-i18n="starterDesc">
                발송 인원과 게시 보장을 분리한 첫 시장 신호 테스트
              </p>
            </div>
            <div className="koaus-price">
              <strong data-final-price-ko="250" data-final-price-en="From ₩2.5M"
                >250</strong
              ><span data-final-price-ko="만원부터" data-final-price-en=""
                >만원부터</span
              ><small data-final-i18n="vatExcluded">VAT 별도</small>
            </div>
            <p className="koaus-per-person" data-final-i18n="starterPerPerson">
              시딩 10~12명 · 게시 3건 보장
            </p>
            <ul>
              <li data-final-i18n="starter1">타깃 크리에이터 10~12명 시딩</li>
              <li data-final-i18n="starter2">숏폼 또는 피드 3건 게시 보장</li>
              <li data-final-i18n="starter3">추가 자연 게시 가능성 확인</li>
              <li data-final-i18n="starter4">제품·카테고리 적합도 진단</li>
              <li data-final-i18n="starter5">기본 반응 리포트</li>
              <li data-final-i18n="starter6">운영 기간 약 4주</li>
            </ul>
            <button
              className="button button--ghost koaus-plan-select"
              type="button"
              data-plan="Starter"
              data-final-i18n="starterCta"
            >
              이 플랜으로 시작하기
            </button>
          </article>

          <article className="koaus-plan-card koaus-plan-card--featured">
            <div className="koaus-popular-badge" data-final-i18n="popularPlan">
              처음 시작하기 좋은 플랜
            </div>
            <div className="koaus-plan-card__head">
              <span>VALIDATION · U.S. MARKET VALIDATION</span>
              <h3 data-final-i18n="validationTitle">미국 시장 검증</h3>
              <p data-final-i18n="validationDesc">
                나노·마이크로 게시와 UGC로 메시지 반응을 비교하는 핵심 패키지
              </p>
            </div>
            <div className="koaus-price">
              <strong data-final-price-ko="480" data-final-price-en="From ₩4.8M"
                >480</strong
              ><span data-final-price-ko="만원부터" data-final-price-en=""
                >만원부터</span
              ><small data-final-i18n="vatExcluded">VAT 별도</small>
            </div>
            <p className="koaus-per-person" data-final-i18n="validationPerPerson">
              나노·마이크로 8건 게시 보장
            </p>
            <ul>
              <li data-final-i18n="validation1">
                미국 나노·마이크로 크리에이터 8건 게시 보장
              </li>
              <li data-final-i18n="validation2">숏폼 UGC 8건</li>
              <li data-final-i18n="validation3">
                브랜드 재사용 가능 UGC 원본 또는 편집본 4건
              </li>
              <li data-final-i18n="validation4">콘텐츠별 링크·쿠폰 추적</li>
              <li data-final-i18n="validation5">메시지·훅·반응 비교</li>
              <li data-final-i18n="validation6">시장 검증 리포트</li>
              <li data-final-i18n="validation7">전략 미팅 1회</li>
            </ul>
            <button
              className="button button--dark koaus-plan-select"
              type="button"
              data-plan="Validation"
              data-final-i18n="validationCta"
            >
              추천 플랜 신청하기
            </button>
          </article>

          <article className="koaus-plan-card">
            <div className="koaus-plan-card__head">
              <span>COMMERCE · PURCHASE SIGNAL PILOT</span>
              <h3 data-final-i18n="commerceTitle">구매 신호 파일럿</h3>
              <p data-final-i18n="commerceDesc">
                게시·UGC·사용권·구매 추적을 결합한 심화 파일럿
              </p>
            </div>
            <div className="koaus-price">
              <strong data-final-price-ko="780" data-final-price-en="From ₩7.8M"
                >780</strong
              ><span data-final-price-ko="만원부터" data-final-price-en=""
                >만원부터</span
              ><small data-final-i18n="vatExcluded">VAT 별도</small>
            </div>
            <p className="koaus-per-person" data-final-i18n="commercePerPerson">
              게시·콘텐츠·사용권·구매 추적 결합
            </p>
            <ul>
              <li data-final-i18n="commerce1">
                미국 크리에이터 10~12건 게시 보장
              </li>
              <li data-final-i18n="commerce2">재사용 가능한 UGC 6건</li>
              <li data-final-i18n="commerce3">
                상위 콘텐츠 2건의 90일 유료 광고 사용권
              </li>
              <li data-final-i18n="commerce4">링크·쿠폰·어필리에이트 추적</li>
              <li data-final-i18n="commerce5">클릭·문의·구매 신호 분석</li>
              <li data-final-i18n="commerce6">심화 시장 리포트</li>
              <li data-final-i18n="commerce7">전략 미팅 2회</li>
            </ul>
            <button
              className="button button--ghost koaus-plan-select"
              type="button"
              data-plan="Commerce"
              data-final-i18n="commerceCta"
            >
              구매 검증 상담하기
            </button>
          </article>
        </div>

        <div className="koaus-pricing-detail">
          <div
            className="koaus-detail-tabs"
            role="tablist"
            aria-label="가격 상세 정보"
          >
            <button
              className="koaus-detail-tab"
              type="button"
              role="tab"
              aria-selected="false"
              aria-controls="comparison-panel"
              id="comparison-tab"
              tabIndex="-1"
              data-final-i18n="tabCompare"
            >
              패키지 비교
            </button>
            <button
              className="koaus-detail-tab is-active"
              type="button"
              role="tab"
              aria-selected="true"
              aria-controls="rate-panel"
              id="rate-tab"
              tabIndex="0"
              data-final-i18n="tabRate"
            >
              비용 산정 기준
            </button>
            <button
              className="koaus-detail-tab"
              type="button"
              role="tab"
              aria-selected="false"
              aria-controls="option-panel"
              id="option-tab"
              tabIndex="-1"
              data-final-i18n="tabOptions"
            >
              추가 옵션
            </button>
          </div>

          <div
            className="koaus-tab-panel"
            id="comparison-panel"
            role="tabpanel"
            aria-labelledby="comparison-tab"
            hidden
          >
            <div className="koaus-table-scroll" tabIndex="0">
              <table>
                <thead>
                  <tr>
                    <th data-final-i18n="comparisonItem">비교 항목</th>
                    <th>Starter</th>
                    <th className="featured-column">Validation</th>
                    <th>Commerce</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th data-final-i18n="totalPackagePrice">
                      총 패키지 금액
                    </th>
                    <td
                      data-final-price-ko="250만원부터"
                      data-final-price-en="From ₩2.5M"
                    >
                      250만원부터
                    </td>
                    <td className="featured-column">
                      <strong
                        data-final-price-ko="480만원부터"
                        data-final-price-en="From ₩4.8M"
                        >480만원부터</strong
                      >
                    </td>
                    <td
                      data-final-price-ko="780만원부터"
                      data-final-price-en="From ₩7.8M"
                    >
                      780만원부터
                    </td>
                  </tr>
                  <tr>
                    <th data-final-i18n="seedingVsPosts">
                      시딩 · 게시 보장
                    </th>
                    <td data-final-i18n="compareStarterSeed">
                      시딩 10~12명 · 게시 3건
                    </td>
                    <td
                      className="featured-column"
                      data-final-i18n="compareValidationPosts"
                    >
                      게시 8건 보장
                    </td>
                    <td data-final-i18n="compareCommercePosts">
                      게시 10~12건 보장
                    </td>
                  </tr>
                  <tr>
                    <th data-final-i18n="ugcAssets">숏폼 · 재사용 UGC</th>
                    <td>–</td>
                    <td
                      className="featured-column"
                      data-final-i18n="compareValidationUgc"
                    >
                      UGC 8건 · 재사용 4건
                    </td>
                    <td data-final-i18n="compareCommerceUgc">재사용 UGC 6건</td>
                  </tr>
                  <tr>
                    <th data-final-i18n="linkCouponTracking">
                      링크·쿠폰·어필리에이트
                    </th>
                    <td>–</td>
                    <td
                      className="featured-column"
                      data-final-i18n="compareValidationTrack"
                    >
                      링크·쿠폰 추적
                    </td>
                    <td data-final-i18n="compareCommerceTrack">
                      링크·쿠폰·어필리에이트
                    </td>
                  </tr>
                  <tr>
                    <th data-final-i18n="paidAdRights">유료 광고 사용권</th>
                    <td>–</td>
                    <td className="featured-column">–</td>
                    <td data-final-i18n="compareCommerceRights">
                      상위 2건 · 90일
                    </td>
                  </tr>
                  <tr>
                    <th data-final-i18n="purchaseSignal">구매 신호 분석</th>
                    <td>–</td>
                    <td
                      className="featured-column"
                      data-final-i18n="compareValidationSignal"
                    >
                      메시지·훅·반응 비교
                    </td>
                    <td data-final-i18n="compareCommerceSignal">
                      클릭·문의·구매 신호
                    </td>
                  </tr>
                  <tr>
                    <th data-final-i18n="resultReport">결과 리포트</th>
                    <td data-final-i18n="basic">기본</td>
                    <td
                      className="featured-column"
                      data-final-i18n="marketValidationReport"
                    >
                      시장 검증 리포트
                    </td>
                    <td data-final-i18n="advanced">심화형</td>
                  </tr>
                  <tr>
                    <th data-final-i18n="strategyMeeting">전략 미팅</th>
                    <td>–</td>
                    <td className="featured-column" data-final-i18n="once">
                      1회
                    </td>
                    <td data-final-i18n="twice">2회</td>
                  </tr>
                  <tr>
                    <th data-final-i18n="operationPeriod">운영 기간</th>
                    <td data-final-i18n="fourWeeks">약 4주</td>
                    <td
                      className="featured-column"
                      data-final-i18n="fiveSixWeeks"
                    >
                      약 5–6주
                    </td>
                    <td data-final-i18n="sixEightWeeks">약 6–8주</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div
            className="koaus-tab-panel is-active"
            id="rate-panel"
            role="tabpanel"
            aria-labelledby="rate-tab"
          >
            <div className="koaus-table-scroll" tabIndex="0">
              <table>
                <thead>
                  <tr>
                    <th data-final-i18n="costBasis">비용 산정 기준</th>
                    <th data-final-i18n="costBasisDesc">설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Creator Reach</th>
                    <td data-final-i18n="costReach">
                      팔로워보다 최근 평균 조회수·참여율·미국 팔로워 비중
                    </td>
                  </tr>
                  <tr>
                    <th>Content Format</th>
                    <td data-final-i18n="costFormat">
                      피드·릴스·틱톡·쇼츠·UGC 제작
                    </td>
                  </tr>
                  <tr>
                    <th>Posting &amp; Rights</th>
                    <td data-final-i18n="costRights">
                      계정 게시 여부, 브랜드 채널 사용, 유료 광고 사용권
                    </td>
                  </tr>
                  <tr>
                    <th>Campaign Operation</th>
                    <td data-final-i18n="costOperation">
                      영문 브리프, 배송, 검수, 리마인드, 재섭외, 보고서
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div
            className="koaus-tab-panel"
            id="option-panel"
            role="tabpanel"
            aria-labelledby="option-tab"
            hidden
          >
            <div className="koaus-addon-grid">
              <article>
                <span data-final-i18n="adRights3">광고 사용권 3개월</span
                ><strong data-final-i18n="from150k">15만원부터</strong
                ><small data-final-i18n="perCreator">크리에이터 1인</small>
              </article>
              <article>
                <span data-final-i18n="adRights6">광고 사용권 6개월</span
                ><strong data-final-i18n="from250k">25만원부터</strong
                ><small data-final-i18n="perCreator">크리에이터 1인</small>
              </article>
              <article>
                <span data-final-i18n="rawVideo">원본 영상 파일</span
                ><strong data-final-i18n="from100k">10만원부터</strong
                ><small data-final-i18n="perContent">콘텐츠 1건</small>
              </article>
              <article>
                <span data-final-i18n="extraHook">추가 훅·버전 제작</span
                ><strong data-final-i18n="from50k">5만원부터</strong
                ><small data-final-i18n="perContent">콘텐츠 1건</small>
              </article>
              <article>
                <span data-final-i18n="extraStory">스토리 추가 게시</span
                ><strong data-final-i18n="from80k">8만원부터</strong
                ><small data-final-i18n="perCreator">크리에이터 1인</small>
              </article>
              <article>
                <span data-final-i18n="commerceFee">커머스 성과 수수료</span
                ><strong>10–15%</strong
                ><small data-final-i18n="orderSales">주문 매출 기준</small>
              </article>
            </div>
          </div>
        </div>
        <p className="koaus-pricing-note" data-final-i18n="pricingNote">
          모든 금액은 VAT 별도이며 ‘부터’ 기준의 시작가입니다. 제품 제공비,
          한국→미국 배송비, 관세, 광고 집행비는 포함되지 않습니다. 시딩
          패키지는 발송 인원과 게시 보장 건수를 분리해 산정합니다. Validation
          이상 패키지는 포함된 크리에이터 보상 예산 상한을 두고, 고액 견적
          발생 시 후보 교체 또는 추가 견적으로 조정합니다. 최종 견적은
          Creator Reach·Content Format·Posting &amp; Rights·Campaign
          Operation 기준에 따라 달라질 수 있습니다.
        </p>
      </div>
    </section>
  );
}
