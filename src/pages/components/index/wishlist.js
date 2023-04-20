import React from "react";

export default function Wishlist({ items }) {
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
                    {items.map((item, index) => (
                        <div className="wishlist-card" key={index}>
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
