export default function ProblemSection() {
  return (
    <div className="decision-head">
      <div className="decision-head__problem">
        <p className="section-kicker" data-final-i18n="problemKicker">
          미국 진출의 불확실성
        </p>
        <h2 id="decision-title" data-final-i18n="problemTitle">
          대량 선적 전에<br />확인할 질문이 남습니다.
        </h2>
        <p data-final-i18n="problemBody">
          실제로 팔리는지, 배송 가능한지, 돈이 남는지, 미국 소비자가 어떻게
          반응하는지를 확인하기 전에 재고와 비용을 먼저 투입하기 쉽습니다.
        </p>
      </div>

      <div className="decision-head__arrow" aria-hidden="true">→</div>

      <div className="decision-head__solution">
        <p className="section-kicker" data-final-i18n="solutionKicker">
          KOAUS US MARKET VALIDATION
        </p>
        <h2 data-final-i18n="solutionTitle">
          불확실성을<br /><em>실제 거래에 가까운 검증</em>으로 바꿉니다.
        </h2>
        <p data-final-i18n="solutionBody">
          KoaUS는 한국 소비재 기업이 미국에 본격 투자하기 전에 시장 적합도,
          Creative 반응, 배송·VOC, 판매원가와 예상 마진까지 하나의 파일럿으로
          검증합니다. UGC와 Creator 콘텐츠는 Creative Test의 실행 수단으로
          활용됩니다.
        </p>
      </div>
    </div>
  );
}
