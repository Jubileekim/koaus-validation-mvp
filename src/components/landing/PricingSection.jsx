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
              PRICING · US MARKET VALIDATION
            </p>
            <h2 id="pricing-title" data-final-i18n="pricingTitle">
              미국시장 검증 패키지.
            </h2>
          </div>
          <p data-final-i18n="pricingBody">
            브랜드의 현재 단계에 맞춰 Product Scan부터 Creative Test,
            Fulfillment·VOC, 마진 검증까지 선택할 수 있습니다. 패키지 금액은
            시작가이며, 산출물 기준으로 구성합니다.
          </p>
        </div>

        <div className="koaus-pricing__cards">
          <article className="koaus-plan-card">
            <div className="koaus-plan-card__head">
              <span>STARTER · PRODUCT SCAN + SIGNAL</span>
              <h3 data-final-i18n="starterTitle">초기 시장 신호 테스트</h3>
              <p data-final-i18n="starterDesc">
                Product Scan과 가벼운 Creative 반응으로 첫 시장 신호를 확인
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
              Product Scan · Creative 신호 테스트
            </p>
            <ul>
              <li data-final-i18n="starter1">제품·경쟁·타깃·가격 Scan</li>
              <li data-final-i18n="starter2">핵심 구매 메시지 초안</li>
              <li data-final-i18n="starter3">소규모 Creative / UGC 신호 테스트</li>
              <li data-final-i18n="starter4">기본 반응 지표 정리</li>
              <li data-final-i18n="starter5">초기 Validation Brief</li>
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
              <span>VALIDATION · US MARKET VALIDATION</span>
              <h3 data-final-i18n="validationTitle">미국시장 검증 파일럿</h3>
              <p data-final-i18n="validationDesc">
                Market Fit + Creative/Demand Test로 반응과 메시지를 검증하는 핵심 패키지
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
              Creative Test · UGC 실행 · 반응 비교
            </p>
            <ul>
              <li data-final-i18n="validation1">
                Product / Market Fit 분석
              </li>
              <li data-final-i18n="validation2">UGC / Short-form Creative 실행</li>
              <li data-final-i18n="validation3">
                Creator 콘텐츠를 포함한 수요 테스트
              </li>
              <li data-final-i18n="validation4">CTR / CPC / 구매의향 측정</li>
              <li data-final-i18n="validation5">메시지·훅·반응 비교</li>
              <li data-final-i18n="validation6">US Market Validation Report</li>
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
              <span>COMMERCE · FULFILLMENT &amp; ECONOMICS</span>
              <h3 data-final-i18n="commerceTitle">배송·VOC·마진 검증</h3>
              <p data-final-i18n="commerceDesc">
                소량 배송, VOC, 물류비와 예상 마진까지 확인하는 심화 파일럿
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
              Fulfillment · VOC · Unit Economics
            </p>
            <ul>
              <li data-final-i18n="commerce1">
                Validation 범위 + 소량 배송 운영
              </li>
              <li data-final-i18n="commerce2">실제 고객 VOC 수집</li>
              <li data-final-i18n="commerce3">
                실제 물류비·판매원가 계산
              </li>
              <li data-final-i18n="commerce4">CAC / 예상 마진 분석</li>
              <li data-final-i18n="commerce5">Unit Economics 정리</li>
              <li data-final-i18n="commerce6">GO / IMPROVE / STOP 리포트</li>
              <li data-final-i18n="commerce7">전략 미팅 2회</li>
            </ul>
            <button
              className="button button--ghost koaus-plan-select"
              type="button"
              data-plan="Commerce"
              data-final-i18n="commerceCta"
            >
              마진 검증 상담하기
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
                      검증 범위
                    </th>
                    <td data-final-i18n="compareStarterSeed">
                      Product Scan · 신호 테스트
                    </td>
                    <td
                      className="featured-column"
                      data-final-i18n="compareValidationPosts"
                    >
                      Market Fit + Creative Test
                    </td>
                    <td data-final-i18n="compareCommercePosts">
                      + Fulfillment &amp; Economics
                    </td>
                  </tr>
                  <tr>
                    <th data-final-i18n="ugcAssets">Creative / UGC</th>
                    <td>–</td>
                    <td
                      className="featured-column"
                      data-final-i18n="compareValidationUgc"
                    >
                      UGC·Short-form 실행
                    </td>
                    <td data-final-i18n="compareCommerceUgc">Creative + 배송 연계</td>
                  </tr>
                  <tr>
                    <th data-final-i18n="linkCouponTracking">
                      반응 측정
                    </th>
                    <td>–</td>
                    <td
                      className="featured-column"
                      data-final-i18n="compareValidationTrack"
                    >
                      CTR / CPC / 구매의향
                    </td>
                    <td data-final-i18n="compareCommerceTrack">
                      반응 + VOC + 물류비
                    </td>
                  </tr>
                  <tr>
                    <th data-final-i18n="paidAdRights">Unit Economics</th>
                    <td>–</td>
                    <td className="featured-column">기본</td>
                    <td data-final-i18n="compareCommerceRights">
                      원가·CAC·마진 심화
                    </td>
                  </tr>
                  <tr>
                    <th data-final-i18n="purchaseSignal">의사결정</th>
                    <td>–</td>
                    <td
                      className="featured-column"
                      data-final-i18n="compareValidationSignal"
                    >
                      GO / IMPROVE / STOP 초안
                    </td>
                    <td data-final-i18n="compareCommerceSignal">
                      GO / IMPROVE / STOP 확정
                    </td>
                  </tr>
                  <tr>
                    <th data-final-i18n="resultReport">결과 리포트</th>
                    <td data-final-i18n="basic">기본 Brief</td>
                    <td
                      className="featured-column"
                      data-final-i18n="marketValidationReport"
                    >
                      US Market Validation Report
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
                    <th>Product Scope</th>
                    <td data-final-i18n="costReach">
                      제품 수, 카테고리 복잡도, 경쟁 분석 깊이
                    </td>
                  </tr>
                  <tr>
                    <th>Creative Test</th>
                    <td data-final-i18n="costFormat">
                      UGC / Short-form / Creator 콘텐츠 실행 범위
                    </td>
                  </tr>
                  <tr>
                    <th>Fulfillment &amp; VOC</th>
                    <td data-final-i18n="costRights">
                      소량 배송 규모, VOC 수집 방식, 물류비 산정
                    </td>
                  </tr>
                  <tr>
                    <th>Validation Operation</th>
                    <td data-final-i18n="costOperation">
                      브리프, 실행 운영, 데이터 정리, Validation Report
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
                <span data-final-i18n="adRights3">추가 Creative 버전</span
                ><strong data-final-i18n="from150k">15만원부터</strong
                ><small data-final-i18n="perCreator">버전 1건</small>
              </article>
              <article>
                <span data-final-i18n="adRights6">추가 UGC 제작</span
                ><strong data-final-i18n="from250k">25만원부터</strong
                ><small data-final-i18n="perCreator">콘텐츠 1건</small>
              </article>
              <article>
                <span data-final-i18n="rawVideo">원본 영상 파일</span
                ><strong data-final-i18n="from100k">10만원부터</strong
                ><small data-final-i18n="perContent">콘텐츠 1건</small>
              </article>
              <article>
                <span data-final-i18n="extraHook">추가 훅·메시지 테스트</span
                ><strong data-final-i18n="from50k">5만원부터</strong
                ><small data-final-i18n="perContent">버전 1건</small>
              </article>
              <article>
                <span data-final-i18n="extraStory">추가 소량 배송 샘플</span
                ><strong data-final-i18n="from80k">8만원부터</strong
                ><small data-final-i18n="perCreator">유닛 기준</small>
              </article>
              <article>
                <span data-final-i18n="commerceFee">심화 Unit Economics</span
                ><strong>별도 견적</strong
                ><small data-final-i18n="orderSales">마진 모델 확장</small>
              </article>
            </div>
          </div>
        </div>
        <p className="koaus-pricing-note" data-final-i18n="pricingNote">
          모든 금액은 VAT 별도이며 ‘부터’ 기준의 시작가입니다. 제품 제공비,
          한국→미국 배송비, 관세, 광고 집행비는 포함되지 않습니다. Starter는
          Product Scan과 초기 신호 테스트 중심으로 산정합니다. Validation 이상
          패키지는 Creative 실행 범위와 포함된 운영 예산 상한을 두고, 고액 견적
          발생 시 범위 조정 또는 추가 견적으로 진행합니다. 최종 견적은 Product
          Scope·Creative Test·Fulfillment &amp; VOC·Validation Operation 기준에
          따라 달라질 수 있습니다.
        </p>
      </div>
    </section>
  );
}
