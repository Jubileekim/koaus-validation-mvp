import { Link } from 'react-router'

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
          <p className="launch-contact__kicker">FOR KOREAN BRANDS</p>
          <h2 id="launch-contact-title">
            Have a Korean product
            <br />
            creators should
            <br />
            know about?
          </h2>
          <p>
            Introduce your product to KoaUS and explore collaboration
            opportunities with U.S. creators.
          </p>
          <div className="launch-contact__promise">
            <span>01</span>
            <p>Share brand and product basics</p>
            <span>02</span>
            <p>Present Group Buy, Affiliate, UGC and other options</p>
            <span>03</span>
            <p>Get your product in front of collaboration-ready creators</p>
          </div>
        </div>

        <div className="launch-inquiry-form" data-reveal>
          <div className="launch-field launch-field--full">
            <p className="launch-contact__kicker">BRAND INQUIRY</p>
            <h3 className="landing-brand-cta__title">List Your Product</h3>
            <p className="landing-brand-cta__body">
              Tell us about your brand on the For Brands page. Product inquiries
              are saved for KoaUS review.
            </p>
          </div>
          <Link className="launch-submit" to="/brands">
            List Your Product →
          </Link>
        </div>
      </div>
    </section>
  )
}
