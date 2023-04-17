import Script from 'next/script'
import Link from 'next/link'
import React from "react";
import Clock from 'react-live-clock';
import HomeNav from "./components/homeNav";

export default function Home() {
    return <div>
        <HomeNav />
        <section className="intro" id="home">
            <div className="container">
                <div className="intro-text">
                    <h2>
                        <span className="hear"> Welcome to my <br />
                            Pokemon Collection</span>
                    </h2>
                    <p>
                        You can find all my Pokemon here <br />
                        but also information about me and my wishlist.
                    </p>
                    <Link className="btn" href="#mypokemon">Straight to my Pokemon</Link>
                </div>
            </div>
        </section>
        <section className="aboutme" id="aboutme">
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
                                format={'HH:mm:ss'}
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
        <section className="wishlist" id="mywishlist">
            <div className="container">
                <div className="wishlist-header">
                    <h2>Wishlist</h2>
                </div>
                <div className="wishlist-desc">
                    The Pokemon under this are on my wishlist. Im looking only for them with at least
                    AB proof and if possible not save-managaed but I wouldnt mind it a lot if it were save-managed.

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
        <section className="pokemon" id="mypokemon">
            <div className="pokemon-container">
                <div className="pokemon-header">
                    <h2>My Pokemon</h2>
                </div>
                <div className="pokemon-body">
                    <div className="pokemon-card">
                        <div className="pokemon-link">
                            <Link className="" href="/sheet/fortrade">For Trade</Link>
                        </div>
                        <div className="pokemon-description">
                            <p>Pokemon that are actively for trade like Events,
                                Shiny Mythicals and Shiny Eggs</p>
                        </div>
                    </div>
                    <div className="pokemon-card">
                        <div className="pokemon-link">
                            <Link className="" href="/sheet/gen8events">Gen 8 Events</Link>
                        </div>
                        <div className="pokemon-description">
                            <p>Events that I farmed during Gen8. Most are from other redeemers.</p>
                        </div>
                    </div>
                    <div className="pokemon-card">
                        <div className="pokemon-link">
                            <Link className="" href="/sheet/gen9events">Gen 9 Events</Link>
                        </div>
                        <div className="pokemon-description">
                            <p>Events that I will farm during Gen9. This will be updated accordingly.
                                Still waiting for HOME combatibility :|</p>
                        </div>
                    </div>
                    <div className="pokemon-card">
                        <div className="pokemon-link">
                            <Link className="" href="/sheet/mycollection">My Collection</Link>
                        </div>
                        <div className="pokemon-description">
                            <p>This is my personal Collection which contains my shiny living dex (working on it)
                            but also events from Gen3 to Gen9. </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
     </div>
}