export default function ProblemSection() {
  return (
    <div className="decision-head">
      <div className="decision-head__problem">
        <p className="section-kicker" data-final-i18n="problemKicker">
          미국 진출의 불확실성
        </p>
        <h2 id="decision-title" data-final-i18n="problemTitle">
          서두르지 않아도 됩니다.<br />통할 근거를 만든 뒤 시작하세요.
        </h2>
        <p data-final-i18n="problemBody">
          준비 없이 미국 시장에 뛰어들 필요는 없습니다. 크리에이터 반응, 콘텐츠 성과, 구매 신호를 먼저 확인한 뒤 투자해도 늦지 않습니다.
        </p>
      </div>

      <div className="decision-head__arrow" aria-hidden="true">→</div>

      <div className="decision-head__solution">
        <p className="section-kicker" data-final-i18n="solutionKicker">
          KOAUS SOLUTION
        </p>
        <h2 data-final-i18n="solutionTitle">
          불확실성을<br /><em>작은 시장 실험</em>으로 바꿉니다.
        </h2>
        <p data-final-i18n="solutionBody">
          Koaus가 브랜드와 맞는 미국 크리에이터를 선별하고, UGC 제작부터
          실제 게시와 구매 추적까지 하나의 파일럿으로 운영합니다.
        </p>
      </div>
    </div>
  );
}
