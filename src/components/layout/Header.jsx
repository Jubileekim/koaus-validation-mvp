export default function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="wordmark" href="/" aria-label="Koaus home"
          >koaus <span>/ us validation</span></a
        >
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#services" data-i18n="navServices">서비스</a>
          <a href="#process" data-i18n="navProcess">진행 방식</a>
          <a href="#pricing" data-final-i18n="navPricing">가격 안내</a>
          <a href="#contact" data-i18n="navContact">문의하기</a>
        </nav>
        <div className="header-actions">
          <a
            className="shop-switch-link"
            href="https://koaus-shop.vercel.app/"
            aria-label="Go to Koaus Shop"
            >koaus shop <span aria-hidden="true">↗</span></a
          >
          <div className="language-toggle" aria-label="Language switcher">
            <button type="button" data-language="ko" className="is-active">
              KO
            </button>
            <button type="button" data-language="en">EN</button>
          </div>
          <a
            className="button button--dark"
            href="#contact"
            data-i18n="requestPilot"
            >제품 검증 시작하기</a
          >
          <button
            className="menu-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="mobile-menu"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </div>
      <nav
        className="mobile-menu"
        id="mobile-menu"
        aria-label="Mobile navigation"
        hidden
      >
        <a href="#services" data-i18n="navServices">서비스</a>
        <a href="#process" data-i18n="navProcess">진행 방식</a>
        <a href="#pricing" data-final-i18n="navPricing">가격 안내</a>
        <a href="#contact" data-i18n="navContact">문의하기</a>
        <a
          className="mobile-shop-link"
          href="https://koaus-shop.vercel.app/"
          aria-label="Go to Koaus Shop"
          >koaus shop <span aria-hidden="true">↗</span></a
        >
      </nav>
    </header>
  );
}
