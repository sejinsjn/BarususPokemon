import React from "react";

export default function Wishlist() {
	return (
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
	)
};