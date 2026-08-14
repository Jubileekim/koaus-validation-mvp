export default function ProcessSection() {
  return (
    <>
      <header className="pilot-decision-heading">
        <p className="section-kicker">HOW IT WORKS</p>
        <div className="pilot-decision-heading__copy">
          <h2 id="process-title">
            Four steps from discovery
            <br />
            <em>to collaboration interest.</em>
          </h2>
          <p>
            Browse curated products, get Creator Access, request a collaboration,
            and KoaUS helps qualified opportunities move forward.
          </p>
        </div>
      </header>

      <div className="process-timeline-shell">
        <div
          className="process-timeline"
          role="tablist"
          aria-label="KoaUS creator collaboration process"
          style={{ '--process-active': '0' }}
        >
          <button
            className="process-node is-active"
            id="process-step-1"
            type="button"
            role="tab"
            aria-selected="true"
            aria-controls="process-detail-1"
            data-process-index="0"
          >
            <span className="process-node__number">01</span>
            <span className="process-node__copy">
              <strong>Discover</strong>
              <small>Browse curated products</small>
            </span>
          </button>
          <button
            className="process-node"
            id="process-step-2"
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="process-detail-2"
            data-process-index="1"
            tabIndex="-1"
          >
            <span className="process-node__number">02</span>
            <span className="process-node__copy">
              <strong>Access</strong>
              <small>Unlock creator-only terms</small>
            </span>
          </button>
          <button
            className="process-node"
            id="process-step-3"
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="process-detail-3"
            data-process-index="2"
            tabIndex="-1"
          >
            <span className="process-node__number">03</span>
            <span className="process-node__copy">
              <strong>Request</strong>
              <small>Choose a collaboration format</small>
            </span>
          </button>
          <button
            className="process-node"
            id="process-step-4"
            type="button"
            role="tab"
            aria-selected="false"
            aria-controls="process-detail-4"
            data-process-index="3"
            tabIndex="-1"
          >
            <span className="process-node__number">04</span>
            <span className="process-node__copy">
              <strong>Build</strong>
              <small>Move qualified interest forward</small>
            </span>
          </button>
        </div>
      </div>

      <div className="process-detail-panels">
        <article
          className="process-detail is-active"
          id="process-detail-1"
          role="tabpanel"
          aria-labelledby="process-step-1"
        >
          <span className="process-detail__number">01</span>
          <div className="process-detail__copy">
            <small>CURRENT STEP</small>
            <h3>Discover Products</h3>
            <p>
              Browse curated Korean products by category, brand and collaboration
              opportunity.
            </p>
          </div>
          <div className="process-detail__output">
            <small>OUTPUT</small>
            <strong>CURATED PRODUCT MATCH</strong>
          </div>
        </article>

        <article
          className="process-detail"
          id="process-detail-2"
          role="tabpanel"
          aria-labelledby="process-step-2"
          hidden
        >
          <span className="process-detail__number">02</span>
          <div className="process-detail__copy">
            <small>CURRENT STEP</small>
            <h3>Get Creator Access</h3>
            <p>
              Share your creator profile to unlock creator-only pricing and
              product terms.
            </p>
          </div>
          <div className="process-detail__output">
            <small>OUTPUT</small>
            <strong>CREATOR ACCESS PROFILE</strong>
          </div>
        </article>

        <article
          className="process-detail"
          id="process-detail-3"
          role="tabpanel"
          aria-labelledby="process-step-3"
          hidden
        >
          <span className="process-detail__number">03</span>
          <div className="process-detail__copy">
            <small>CURRENT STEP</small>
            <h3>Request Collaboration</h3>
            <p>
              Choose Group Buy, Affiliate, UGC or other available collaboration
              formats.
            </p>
          </div>
          <div className="process-detail__output">
            <small>OUTPUT</small>
            <strong>COLLABORATION REQUEST</strong>
          </div>
        </article>

        <article
          className="process-detail"
          id="process-detail-4"
          role="tabpanel"
          aria-labelledby="process-step-4"
          hidden
        >
          <span className="process-detail__number">04</span>
          <div className="process-detail__copy">
            <small>CURRENT STEP</small>
            <h3>Build the Opportunity</h3>
            <p>
              KoaUS reviews collaboration interest and helps qualified
              opportunities move forward.
            </p>
          </div>
          <div className="process-detail__output">
            <small>OUTPUT</small>
            <strong>QUALIFIED INTEREST REVIEW</strong>
          </div>
        </article>
      </div>
    </>
  )
}
