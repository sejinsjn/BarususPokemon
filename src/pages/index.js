import React from "react";
import Link from 'next/link'
import Header from "/components/Header";
import Intro from "/components/index/Intro";
import Footer from "/components/Footer";
import Section from "/components/index/Section";
import Clock from 'react-live-clock';

const navItems = [
    {
        url: '#home',
        label: 'Home'
    },
    {
        url: '#aboutme',
        label: 'About Me'
    },
    {
        url: '#mywishlist',
        label: 'My Wishlist'
    },
    {
        url: '#mypokemon',
        label: 'My Pokemon'
    }
];

function AboutMe() {
    const cards = [
        {
            title: 'Main OT',
            type: 'content',
            content: 'Barusu'
        },
        {
            title: 'My current time',
            type: 'clock',
            format: 'HH:mm:ss',
            timezone: 'Europe/Berlin'
        },
        {
            title: 'Switch FC',
            type: 'content',
            content: 'SW-2175-4415-8615'
        },
        {
            title: 'HOME FC',
            type: 'content',
            content: 'PKCWBWYYMAQK'
        }
    ];

    return (
        <div className="container">
            {cards.map((card, index) => (
                <div className="aboutme-card" key={index}>
                    <div>
                        <h4>{card.title}</h4>
                        {card.type === 'clock' ? (
                            <p>
                                <Clock
                                    format={card.format}
                                    ticking={true}
                                    timezone={card.timezone} />
                            </p>
                        ) : (
                            <p>{card.content}</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

function MyWishlist() {
    const items = [
        'Winter 2020 World Hobby Fair Gmax Lapras / Coalossal',
        'JPN Pokemon Center Bday Eevee / Pikachu',
        'SG Pokemon Center Bday Eevee / Pikachu',
        '(KOR) Shiny G-Articuno',
        'Shiny Rayquaza Events',
        'Active Serial Codes'
    ];

    return (
        <div className="container">
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
    );
}

function MyPokemon() {
    return (
        <div className="container">
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
                        Still waiting for HOME update. Shit is slow af :|</p>
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
    );
}

export default function Home() {
    return (
        <div className="nextjs">
            <link rel="stylesheet" href="/static/css/index.css" />
            <Header navItems={navItems} />
            <main>
                <Intro />
                <Section title="About Me" id="aboutme" content={() => <AboutMe />} />
                <Section title="My Wishlist" id="mywishlist" content={() => <MyWishlist />} />
                <Section title="My Pokemon" id="mypokemon" content={() => <MyPokemon />} />
            </main>
            <Footer />
        </div>
    )
}; 
