import Link from 'next/link'
import Script from 'next/script'

export default function Nav() {
    return <div id="header-container">
        <link rel="stylesheet" href="/static/css/nav.css" />
        <Script src="/static/js/navScript.js"></Script>
        <header role="navigation">
            <h2>Barusu</h2>
            <nav id="nav-menu">
                <input id="nav-check2" type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="nav-links">
                    <li><Link className="nav-item ni2" href="/">Home</Link></li>
                    <li><Link className="nav-item ni2" href="/sheet/fortrade">For Trade</Link></li>
                    <li><Link className="nav-item ni2" href="/sheet/gen8events">Gen 8 Events</Link></li>
                    <li><Link className="nav-item ni2" href="/sheet/gen9events">Gen 9 Events</Link></li>
                    <li><Link className="nav-item ni2" href="/sheet/mycollection">My Collection</Link></li>
                </ul>
            </nav>
        </header>
    </div>
}
