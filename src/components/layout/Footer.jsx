export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <strong>koaus</strong> —
          <span data-i18n="footerText"
            >한국 소비재의 미국시장 실증 검증 서비스.</span
          >
        </div>
        <div className="footer-links">
          <a href="#services" data-i18n="navServices">서비스</a
          ><a href="#pricing" data-final-i18n="navPricing">가격 안내</a
          ><a href="#contact" data-i18n="navContact">문의하기</a
          ><a
            href="https://www.instagram.com/koaus.shop"
            target="_blank"
            rel="noreferrer"
            >Instagram</a
          >
        </div>
      </div>
    </footer>
  );
}
