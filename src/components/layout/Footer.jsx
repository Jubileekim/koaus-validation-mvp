import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div>
          <strong>koaus</strong> —
          <span>Connecting Korean products with U.S. creators.</span>
        </div>
        <div className="footer-links">
          <Link to="/marketplace">Marketplace</Link>
          <Link to="/creator-access">Creator Access</Link>
          <Link to="/brands">For Brands</Link>
          <a
            href="https://www.instagram.com/koaus.shop"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  )
}
