import Nav from "./nav";
import Link from 'next/link'
import React from "react";
import Clock from 'react-live-clock';

export default function Home() {
    return <div>
        <Nav />
        <section className="intro">
            <div className="container">
                <div className="intro-text">
                    <h2>
                        <span className="hear"> Welcome to my <br />
                            Pokemon Collection</span>
                    </h2>
                    <p>
                        You will find my whole Pokemon Collection here but also <br />
                        stuff about me like my wishlist.
                    </p>
                    <Link className="btn" href="/sheet/fortrade">Straight to my ForTrade</Link>
                </div>
                <div className="i-frame">
                    Picture
                </div>
            </div>
        </section>
        <section className="aboutme">
            <div className="container">
                <div className="aboutme-header">
                    <h2>About me</h2>
                </div>
                <div className="aboutme-body">
                    <div className="aboutme-card">
                        <div>
                            <h4>Main OT</h4>
                            <p>Barusu</p>
                        </div>
                    </div>
                    <div className="aboutme-card">
                        <div>
                            <h4>My current time</h4>
                            <p><Clock
                                format={'HH:mm'}
                                ticking={true}
                                timezone={'Europe/Berlin'} /></p>
                        </div>
                    </div>
                    <div className="aboutme-card">
                        <div>
                            <h4>Switch FC</h4>
                            <p>SW-2175-4415-8615</p>
                        </div>
                    </div>
                    <div className="aboutme-card">
                        <div>
                            <h4>HOME FC</h4>
                            <p>SW-2175-4415-8615</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="wishlist">
            <div className="container">
                <div className="wishlist-header">
                    <h2>Wishlist</h2>
                </div>
                <div className="wishlist-body">
                    <div className="wishlist-card">
                        <p>JPN Pokemon Center Bday Eevee / Pikachu</p>
                    </div>
                    <div className="wishlist-card">
                        <p>Winter 2020 World Hobby Fair Gmax Lapras / Coalossal</p>
                    </div>
                    <div className="wishlist-card">
                        <p>20th Anni Mew, Shaymin, Genesect and Arceus</p>
                    </div>
                    <div className="wishlist-card">
                        <p>(KOR) Shiny G-Articuno</p>
                    </div>
                    <div className="wishlist-card">
                        <p>Shiny Rayquaza Events</p>
                    </div>
                    <div className="wishlist-card">
                        <p>Active Serial Codes</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="pokemon">
            
        </section>
     </div>
}