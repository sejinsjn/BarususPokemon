import React from "react";
import HomeNav from "./components/index/homeNav";
import Intro from "./components/index/intro";
import About from "./components/index/about";
import Wishlist from "./components/index/wishlist";
import Pokemon from "./components/index/pokemon";

export default function Home() {
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

    const items = [
        'JPN Pokemon Center Bday Eevee / Pikachu',
        'Winter 2020 World Hobby Fair Gmax Lapras / Coalossal',
        '20th Anni Mew, Shaymin, Genesect and Arceus',
        '(KOR) Shiny G-Articuno',
        'Shiny Rayquaza Events',
        'Active Serial Codes'
    ];

    return (
        <main>
            <link rel="stylesheet" href="/static/css/index.css" />
            <HomeNav />
            <Intro />
            <About cards={cards} />
            <Wishlist items={items} />
            <Pokemon />
        </main>
    )
}; 
