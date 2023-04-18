import Link from 'next/link'
import React, { useState, useEffect } from 'react';

function LinkWithOnClick(url, name) {
    const [checked, setChecked] = useState(false);

    const linkhandler = () => {
        document.getElementById("nav-check1").checked = false;
    }

    return (
        <Link className="nav-item ni2" href={url}
            onClick={linkhandler}>{name}</Link>
    );
}

export default function HomeNav() {
    return <div id="header-container">
        <link rel="stylesheet" href="/static/css/nav.css" />
        <header role="navigation">
            <h2>Barusu</h2>
            <nav id="nav-menu">
                <input id="nav-check1" type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="nav-links">
                    <li>{LinkWithOnClick("#home", "Home")}</li>
                    <li>{LinkWithOnClick("#aboutme", "About Me")}</li>
                    <li>{LinkWithOnClick("#mywishlist", "My Wishlist")}</li>
                    <li>{LinkWithOnClick("#mypokemon", "My Pokemon")}</li>
                </ul>
            </nav>
        </header>
    </div>
}
