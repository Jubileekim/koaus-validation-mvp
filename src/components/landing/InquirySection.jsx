export default function InquirySection() {
  return (
    <section
      className="launch-contact"
      id="contact"
      data-rail-section
      aria-labelledby="launch-contact-title"
    >
      <div className="shell launch-contact__grid">
        <div className="launch-contact__intro" data-reveal>
          <p className="launch-contact__kicker">US MARKET VALIDATION INQUIRY</p>
          <h2 id="launch-contact-title" data-final-i18n="contactTitle">
            우리 제품,<br />미국에 보내기 전에<br />30분 검증 진단부터 시작하세요.
          </h2>
          <p data-final-i18n="contactBody">
            제품, 목표 시장, 일정 또는 현재 고민을 간단히 남겨주세요. KoaUS가
            현재 단계에 맞는 가장 작은 미국시장 검증 범위를 제안합니다.
          </p>
          <div className="launch-contact__promise">
            <span>01</span>
            <p data-final-i18n="contactPromise1">
              한 제품부터 시작할 수 있는 현실적인 검증 범위
            </p>
            <span>02</span>
            <p data-final-i18n="contactPromise2">
              Market Fit · Creative Test · Fulfillment &amp; Economics 구성
            </p>
            <span>03</span>
            <p data-final-i18n="contactPromise3">
              GO / IMPROVE / STOP을 판단할 수 있는 다음 단계
            </p>
          </div>
        </div>

        <form
          className="launch-inquiry-form"
          id="lead-form"
          noValidate
          data-reveal
        >
          <input
            id="selected-plan"
            name="selectedPlan"
            type="hidden"
            value=""
          />
          <div className="launch-field launch-field--full">
            <label htmlFor="inquiry-type"
              ><span data-i18n="labelInquiryType">문의 유형</span>
              <b>*</b></label
            >
            <select id="inquiry-type" name="inquiryType" required defaultValue="">
              <option
                value=""
                                  disabled
                data-i18n="selectInquiryType"
              >
                문의 유형 선택
              </option>
              <option value="us-launch" data-i18n="inquiryUsLaunch">
                미국시장 검증 파일럿
              </option>
              <option value="market-validation" data-i18n="inquiryValidation">
                Product Scan / Market Fit
              </option>
              <option value="creator-seeding" data-i18n="inquiryCreator">
                Creative &amp; Demand Test
              </option>
              <option value="ugc-production" data-i18n="inquiryUgc">
                Fulfillment &amp; VOC
              </option>
              <option value="amazon-launch" data-i18n="inquiryAmazon">
                Validation Report 상담
              </option>
              <option value="other" data-i18n="other">기타</option>
            </select>
          </div>

          <div className="launch-form-grid">
            <div className="launch-field launch-field--full">
              <label htmlFor="brand-name"
                ><span data-i18n="labelBrand">브랜드명</span> <b>*</b></label
              >
              <input
                id="brand-name"
                name="brand"
                type="text"
                required
                data-placeholder-ko="브랜드명"
                data-placeholder-en="Brand name"
                placeholder="브랜드명"
                autoComplete="organization"
              />
            </div>
            <div className="launch-field">
              <label htmlFor="contact-name"
                ><span data-i18n="labelName">담당자 성함</span>
                <b>*</b></label
              >
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                data-placeholder-ko="담당자 성함"
                data-placeholder-en="Contact name"
                placeholder="담당자 성함"
                autoComplete="name"
              />
            </div>
            <div className="launch-field">
              <label htmlFor="contact-phone"
                ><span data-i18n="labelPhone">연락처</span> <b>*</b></label
              >
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                data-placeholder-ko="010-0000-0000"
                data-placeholder-en="+1 000 000 0000"
                placeholder="010-0000-0000"
                autoComplete="tel"
              />
            </div>
            <div className="launch-field launch-field--full">
              <label htmlFor="contact-email"
                ><span data-i18n="labelEmail">이메일</span> <b>*</b></label
              >
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                data-placeholder-ko="email@example.com"
                data-placeholder-en="email@example.com"
                placeholder="email@example.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="launch-field launch-field--full launch-field--compact-note">
            <label htmlFor="launch-goal">
              <span data-final-i18n="labelGoalDetail">현재 가장 궁금한 점 (선택)</span>
            </label>
            <textarea
              id="launch-goal"
              name="goal"
              rows="4"
              data-placeholder-ko="제품, 목표 시장, 일정 또는 현재 검증 고민을 간단히 남겨주세요."
              data-placeholder-en="Briefly share your product, target market, timeline, or validation concern."
              placeholder="제품, 목표 시장, 일정 또는 현재 검증 고민을 간단히 남겨주세요."
            ></textarea>
          </div>

          <label className="launch-consent"
            ><input type="checkbox" name="consent" required /><span
              data-i18n="consent"
              >문의 검토와 후속 연락을 위해 입력한 정보를 저장하는 데
              동의합니다.</span
            ></label
          >
          <button
            className="launch-submit"
            type="submit"
            data-final-i18n="submitDiagnosis"
          >
            무료 미국시장 검증 진단 요청하기 →
          </button>
          <p className="form-message" role="status" aria-live="polite"></p>
          <p className="launch-form-note" data-i18n="formNote">
            제출하신 문의는 KoaUS 담당자 이메일로 바로 전달됩니다. 확인 후
            연락드리겠습니다.
          </p>
        </form>
      </div>
    </section>
  );
}
