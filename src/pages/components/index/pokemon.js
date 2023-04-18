import Link from 'next/link'
import React from "react";

export default function Pokemon() {
    return (
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
    )
};