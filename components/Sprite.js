import Image from "next/image";
import { useEffect, useState } from "react";

export default function Sprite({ pokedexNr, isShiny, height, width }) {
    const swshNormalURL = `https://www.serebii.net/swordshield/pokemon/${pokedexNr}.png`;
    const svNormalURL = `https://www.serebii.net/scarletviolet/pokemon/new/${pokedexNr}.png`;
    const swshShinyURL = `https://www.serebii.net/Shiny/SWSH/${pokedexNr}.png`;
    const svShinyURL = `https://www.serebii.net/Shiny/SV/new/${pokedexNr}.png`;

    const [imageSrc, setImageSrc] = useState(svNormalURL);
    const fallback = isShiny === "TRUE" ? swshShinyURL : swshNormalURL;

    useEffect(() => {
        const url = isShiny === "TRUE" ? svShinyURL : svNormalURL;
        setImageSrc(url);
    }, [pokedexNr, isShiny, svNormalURL, svShinyURL]);

    const handleImageError = () => {
        setImageSrc(fallback);
    };

    if (pokedexNr === undefined || pokedexNr === "") {
        return <p></p>;
    }

    return (
        <Image
            className="tableSprite"
            width={width}
            height={height}
            src={imageSrc}
            onError={handleImageError}
            alt="Image"
        />
    );
}
