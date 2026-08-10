export default function ReportSection() {
  return (
    <>
    <div className="pilot-report-bridge" aria-hidden="true">
      <span>01–04</span>
      <i></i>
      <strong>U.S. MARKET DECISION REPORT</strong>
    </div>

    <div className="pilot-report-grid">
      <div className="pilot-report-copy">
        <p className="section-kicker" data-final-i18n="resultsKicker">
          YOUR PILOT REPORT
        </p>
        <h3 data-final-i18n="resultsTitle">
          콘텐츠 개수가 아니라,<br /><em>다음 결정을 위한 지표</em>를 남깁니다.
        </h3>
        <p data-final-i18n="resultsBody">
          캠페인이 끝난 뒤 단순 조회수만 남기지 않습니다. 콘텐츠 반응, 고객 참여, 구매 신호를 구분해 무엇을 계속하고 무엇을 바꿔야 하는지 정리합니다.
        </p>
        <dl className="pilot-report-list">
          <div>
            <dt>Content</dt>
            <dd data-final-i18n="metricContent">포맷·훅·메시지별 성과</dd>
          </div>
          <div>
            <dt>Audience</dt>
            <dd data-final-i18n="metricAudience">조회·저장·댓글·참여율</dd>
          </div>
          <div>
            <dt>Commerce</dt>
            <dd data-final-i18n="metricCommerce">클릭·쿠폰·문의·구매 신호</dd>
          </div>
          <div>
            <dt>Decision</dt>
            <dd data-final-i18n="metricDecision">계속할 것·바꿀 것·다음 테스트</dd>
          </div>
        </dl>
      </div>

      <div
        className="koaus-dashboard pilot-report-dashboard"
        aria-label="미국 시장 파일럿 결과 리포트 예시"
      >
        <div className="koaus-dashboard__top">
          <div>
            <span>SAMPLE REPORT</span>
            <strong>U.S. Market Decision Report</strong>
          </div>
          <span className="koaus-dashboard__status"><i></i> PILOT COMPLETE</span>
        </div>

        <div className="koaus-dashboard__metrics">
          <article>
            <span>Creators</span><strong>8</strong><small>matched</small>
          </article>
          <article>
            <span>Contents</span><strong>8</strong><small>published</small>
          </article>
          <article>
            <span>Views</span><strong>12,430</strong><small>total</small>
          </article>
          <article>
            <span>Signals</span><strong>23</strong><small>purchase intent</small>
          </article>
        </div>

        <div className="koaus-dashboard__lower">
          <div className="koaus-dashboard__chart" aria-label="Creator response Top 4">
            <div className="koaus-dashboard__chart-head">
              <span>Creator response</span><strong>Top 4</strong>
            </div>
            <div className="koaus-dashboard__bars" aria-hidden="true">
              <div><i style={{ '--bar': '88%' }}></i><span>A</span></div>
              <div><i style={{ '--bar': '72%' }}></i><span>B</span></div>
              <div><i style={{ '--bar': '58%' }}></i><span>C</span></div>
              <div><i style={{ '--bar': '42%' }}></i><span>D</span></div>
            </div>
          </div>

          <div className="koaus-dashboard__insight">
            <span>TOP INSIGHT</span>
            <strong data-final-i18n="dashboardInsight">
              일상 루틴형 콘텐츠의 저장과 제품 질문이 가장 높았습니다.
            </strong>
            <small data-final-i18n="dashboardNext">
              NEXT · 광고용 훅 2종 추가 테스트
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
