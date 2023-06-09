import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ShinySprite({ pokedexNr, height, width }) {
    if (!pokedexNr) return null;

    const swshShinyURL = `https://www.serebii.net/Shiny/SWSH/${pokedexNr}.png`;
    const svShinyURL = `https://www.serebii.net/Shiny/SV/new/${pokedexNr}.png`;
    const [imageSrc, setImageSrc] = useState(svShinyURL);

    const handleImageError = () => {
        setImageSrc(swshShinyURL);
    };

    return (
        <img
            className="tableSprite"
            width={width}
            height={height}
            src={imageSrc}
            onError={handleImageError}
            alt="Image"
        />
    );
}
