import Link from 'next/link'
import React from "react";

export default function Intro() {
	return (
        <section className="intro" id="home">
            <div className="intro-container">
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
                <div className="parallelogram">
                </div>
            </div>
        </section>
	)
};