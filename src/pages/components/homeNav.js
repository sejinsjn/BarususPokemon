import Link from 'next/link'
import Script from 'next/script'

export default function HomeNav() {
    return <div id="header-container">
        <link rel="stylesheet" href="/static/css/nav.css" />
        <Script src="/static/js/script.js"></Script>
        <header role="navigation">
            <h2>Barusu</h2>
            <nav id="nav-menu">
                <input id="nav-check1" type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="nav-links">
                    <li><Link className="nav-item ni1" href="#home">Home</Link></li>
                    <li><Link className="nav-item ni1" href="#aboutme">About Me</Link></li>
                    <li><Link className="nav-item ni1" href="#mywishlist">My Wishlist</Link></li>
                    <li><Link className="nav-item ni1" href="#mypokemon">My Pokemon</Link></li>
                </ul>
            </nav>
        </header>
    </div>
}
