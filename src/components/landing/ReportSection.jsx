export default function ReportSection() {
  return (
    <>
    <div className="pilot-report-bridge" aria-hidden="true">
      <span>01–04</span>
      <i></i>
      <strong>US MARKET VALIDATION REPORT</strong>
    </div>

    <div className="pilot-report-grid">
      <div className="pilot-report-copy">
        <p className="section-kicker" data-final-i18n="resultsKicker">
          YOUR VALIDATION REPORT
        </p>
        <h3 data-final-i18n="resultsTitle">
          광고 숫자만이 아니라,<br /><em>투자 결정을 위한 검증 지표</em>를 남깁니다.
        </h3>
        <p data-final-i18n="resultsBody">
          시장 신호, Creative 적합도, 고객 목소리, 공헌이익을 한 리포트로
          정리해 대량 선적 전에 GO / IMPROVE / STOP을 판단할 수 있게 합니다.
        </p>
        <dl className="pilot-report-list">
          <div>
            <dt>Market Fit</dt>
            <dd data-final-i18n="metricContent">경쟁·타깃·가격·메시지 적합도</dd>
          </div>
          <div>
            <dt>Creative</dt>
            <dd data-final-i18n="metricAudience">UGC·광고 반응과 수요 신호</dd>
          </div>
          <div>
            <dt>Fulfillment</dt>
            <dd data-final-i18n="metricCommerce">소량 배송·VOC·물류비</dd>
          </div>
          <div>
            <dt>Decision</dt>
            <dd data-final-i18n="metricDecision">GO / IMPROVE / STOP 제안</dd>
          </div>
        </dl>
      </div>

      <div
        className="koaus-dashboard pilot-report-dashboard"
        aria-label="미국 시장 검증 리포트 예시"
      >
        <div className="koaus-dashboard__top">
          <div>
            <span>SAMPLE REPORT</span>
            <strong>US Market Validation Report</strong>
          </div>
          <span className="koaus-dashboard__status"><i></i> IMPROVE</span>
        </div>

        <div className="koaus-dashboard__metrics">
          <article>
            <span>Market Signal</span><strong>72</strong><small>/ 100</small>
          </article>
          <article>
            <span>Creative Fit</span><strong>81</strong><small>/ 100</small>
          </article>
          <article>
            <span>Customer Voice</span><strong>76</strong><small>/ 100</small>
          </article>
          <article>
            <span>Contribution Margin</span><strong>22.8%</strong><small>estimated</small>
          </article>
        </div>

        <div className="koaus-dashboard__lower">
          <div className="koaus-dashboard__chart" aria-label="Validation score breakdown">
            <div className="koaus-dashboard__chart-head">
              <span>Score breakdown</span><strong>Top signals</strong>
            </div>
            <div className="koaus-dashboard__bars" aria-hidden="true">
              <div><i style={{ '--bar': '81%' }}></i><span>C</span></div>
              <div><i style={{ '--bar': '76%' }}></i><span>V</span></div>
              <div><i style={{ '--bar': '72%' }}></i><span>M</span></div>
              <div><i style={{ '--bar': '46%' }}></i><span>E</span></div>
            </div>
          </div>

          <div className="koaus-dashboard__insight">
            <span>RECOMMENDATION</span>
            <strong data-final-i18n="dashboardInsight">
              고객 반응은 긍정적이나 현재 단품 배송 구조에서는 물류비 비중이 높습니다.
              2-Pack Bundle 또는 패키지 경량화 후 재검증을 권장합니다.
            </strong>
            <small data-final-i18n="dashboardNext">
              NEXT · IMPROVE → Bundle / Packaging retest
            </small>
          </div>
        </div>

        <p data-final-i18n="dashboardDisclaimer">
          표시된 수치는 화면 설명을 위한 예시 데이터입니다.
        </p>
      </div>
    </div>
    </>
  );
}
