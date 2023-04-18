import React from "react";
import HomeNav from "./components/index/homeNav";
import Intro from "./components/index/intro";
import About from "./components/index/about";
import Wishlist from "./components/index/wishlist";
import Pokemon from "./components/index/pokemon";

export default function Home() {
    return (
        <div>
            <link rel="stylesheet" href="/static/css/index.css" />
            <HomeNav />
            <Intro />
            <About />
            <Wishlist />
            <Pokemon />
        </div>
    )
}; 
