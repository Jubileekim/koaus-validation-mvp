export default function SolutionSection() {
  return (
    <div className="decision-lanes" aria-label="How KoaUS connects creators and brands">
      <article className="decision-lane decision-lane--creator">
        <div className="decision-problem">
          <div className="decision-problem__meta">
            <span>01</span>
            <small>Creator Discovery</small>
          </div>
          <h3>Finding collaboration-ready Korean brands is difficult.</h3>
          <p>
            Opportunities are hard to compare, and most catalogs are not built
            for creator collaboration.
          </p>
        </div>
        <div className="decision-connector" aria-hidden="true">
          <span>→</span>
        </div>
        <div className="decision-solution">
          <span className="decision-solution__type">01 DISCOVER</span>
          <h3>Curated Korean Products</h3>
          <ul>
            <li>Explore beauty, fashion, lifestyle, food and wellness</li>
            <li>See brands open to creator collaboration</li>
            <li>Browse by category, brand and opportunity</li>
            <li>Start from a curated marketplace, not cold DMs</li>
          </ul>
        </div>
      </article>

      <article className="decision-lane decision-lane--ugc">
        <div className="decision-problem">
          <div className="decision-problem__meta">
            <span>02</span>
            <small>Creator Terms</small>
          </div>
          <h3>Wholesale / creator pricing is rarely transparent.</h3>
          <p>
            MOQ, samples and collaboration conditions are usually hidden until
            after a long back-and-forth.
          </p>
        </div>
        <div className="decision-connector" aria-hidden="true">
          <span>→</span>
        </div>
        <div className="decision-solution">
          <span className="decision-solution__type">02 ACCESS</span>
          <h3>Creator-only Terms</h3>
          <ul>
            <li>Unlock creator-only pricing</li>
            <li>See MOQ and sample availability</li>
            <li>Review collaboration conditions</li>
            <li>Get access with a creator profile</li>
          </ul>
        </div>
      </article>

      <article className="decision-lane decision-lane--commerce">
        <div className="decision-problem">
          <div className="decision-problem__meta">
            <span>03</span>
            <small>Collaboration</small>
          </div>
          <h3>Opportunities are scattered across DMs and emails.</h3>
          <p>
            Brands also struggle to find relevant U.S. creators and to tell who
            is genuinely interested.
          </p>
        </div>
        <div className="decision-connector" aria-hidden="true">
          <span>→</span>
        </div>
        <div className="decision-solution">
          <span className="decision-solution__type">03 COLLABORATE</span>
          <h3>Request Collaboration</h3>
          <ul>
            <li>Submit Group Buy interest</li>
            <li>Request Affiliate partnerships</li>
            <li>Propose UGC collaborations</li>
            <li>Share other formats the brand already offers</li>
          </ul>
        </div>
      </article>
    </div>
  )
}
