import { Link } from 'react-router'

export default function ReportSection() {
  return (
    <>
      <div className="pilot-report-bridge" aria-hidden="true">
        <span>CREATOR ACCESS</span>
        <i></i>
        <strong>CREATOR OPPORTUNITY</strong>
      </div>

      <div className="pilot-report-grid">
        <div className="pilot-report-copy">
          <p className="section-kicker">CREATOR OPPORTUNITY</p>
          <h3>
            Everything creators need
            <br />
            <em>before reaching out.</em>
          </h3>
          <p>
            Once Creator Access is active, product pages show the terms that
            help you decide how to collaborate.
          </p>
          <dl className="pilot-report-list">
            <div>
              <dt>Creator Price</dt>
              <dd>Unlock after Creator Access</dd>
            </div>
            <div>
              <dt>MOQ</dt>
              <dd>Minimum order quantity</dd>
            </div>
            <div>
              <dt>Sample Availability</dt>
              <dd>See whether a sample is offered</dd>
            </div>
            <div>
              <dt>Collaboration Types</dt>
              <dd>Group Buy, Affiliate, UGC and more</dd>
            </div>
          </dl>
          <Link className="button button--dark" to="/marketplace">
            Explore Marketplace
          </Link>
        </div>

        <div
          className="koaus-dashboard pilot-report-dashboard"
          aria-label="Creator-only product information preview"
        >
          <div className="koaus-dashboard__top">
            <div>
              <span>CREATOR ACCESS</span>
              <strong>Creator Access Active</strong>
            </div>
            <span className="koaus-dashboard__status">
              <i></i> ACTIVE
            </span>
          </div>

          <div className="koaus-dashboard__metrics">
            <article>
              <span>Creator Price</span>
              <strong>$14.50</strong>
              <small>example</small>
            </article>
            <article>
              <span>MOQ</span>
              <strong>20</strong>
              <small>units</small>
            </article>
            <article>
              <span>Sample</span>
              <strong>Yes</strong>
              <small>available</small>
            </article>
            <article>
              <span>Collaboration</span>
              <strong>UGC</strong>
              <small>Group Buy / UGC</small>
            </article>
          </div>

          <div className="koaus-dashboard__lower">
            <div
              className="koaus-dashboard__chart"
              aria-label="Collaboration formats"
            >
              <div className="koaus-dashboard__chart-head">
                <span>Formats</span>
                <strong>Available types</strong>
              </div>
              <div className="koaus-dashboard__bars" aria-hidden="true">
                <div>
                  <i style={{ '--bar': '88%' }}></i>
                  <span>G</span>
                </div>
                <div>
                  <i style={{ '--bar': '74%' }}></i>
                  <span>A</span>
                </div>
                <div>
                  <i style={{ '--bar': '81%' }}></i>
                  <span>U</span>
                </div>
                <div>
                  <i style={{ '--bar': '46%' }}></i>
                  <span>S</span>
                </div>
              </div>
            </div>

            <div className="koaus-dashboard__insight">
              <span>NEXT STEP</span>
              <strong>
                Request a collaboration from the product page after Creator
                Access is active.
              </strong>
              <small>NEXT · Request Collaboration</small>
            </div>
          </div>

          <p>Example product terms for presentation. Not live pricing.</p>
        </div>
      </div>
    </>
  )
}
