import Link from 'next/link'
import React, { useState, useEffect } from 'react';

function LinkWithOnClick(url, name) {
    const [checked, setChecked] = useState(false);

    const linkhandler = () => {
        document.getElementById("nav-check2").checked = false;
    }

    useEffect(() => {
        console.log(document.getElementById("nav-check2").checked);
    }, [checked]);


    return (
        <Link className="nav-item ni2" href={ url } 
            onClick={linkhandler}>{ name }</Link>
    );
}

export default function Nav() {
    return <div id="header-container">
        <link rel="stylesheet" href="/static/css/nav.css" />
        <header role="navigation">
            <h2>Barusu</h2>
            <nav id="nav-menu">
                <input id="nav-check2" type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="nav-links">
                    <li>{LinkWithOnClick("/", "Home")}</li>
                    <li>{LinkWithOnClick("/sheet/fortrade", "For Trade")}</li>
                    <li>{LinkWithOnClick("/sheet/gen8events", "Gen 8 Events")}</li>
                    <li>{LinkWithOnClick("/sheet/gen9events", "Gen 9 Events")}</li>
                    <li>{LinkWithOnClick("/sheet/mycollection", "My Collection")}</li>
                </ul>
            </nav>
        </header>
    </div>
}
