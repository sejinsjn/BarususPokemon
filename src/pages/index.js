import Nav from "./nav";

export default function Home() {
    return <div>
        <Nav />
        <section className="intro">
            <div className="intro-text">
                <h2>
                    <span className="hear"> Welcome to my <br />
                        Pokemon Collection</span>
                </h2>
                <p>
                    You will find my whole Pokemon Collection here but also <br />
                    stuff about me like my wishlist.
                </p>
                <a className="btn" href="/sheet/fortrade">Straight to my ForTrade</a>
            </div>
            <div className="i-frame">
                Picture
            </div>
        </section>
     </div>
}