import Image from "next/image";
import { useEffect, useState } from "react";

export default function Sprite({ pokedexNr, isShiny, height, width }) {
    if (pokedexNr === undefined || pokedexNr === "") return <p></p>;

    var url = "";
    var fallback = "";

    const swshNormalURL = `https://www.serebii.net/swordshield/pokemon/${pokedexNr}.png`;
    const svNormalURL = `https://www.serebii.net/scarletviolet/pokemon/new/${pokedexNr}.png`;
    const swshShinyURL = `https://www.serebii.net/Shiny/SWSH/${pokedexNr}.png`;
    const svShinyURL = `https://www.serebii.net/Shiny/SV/new/${pokedexNr}.png`;

    if (isShiny == "TRUE") {
        url = svShinyURL;
        fallback = swshShinyURL;
    } else {
        url = svNormalURL;
        fallback = swshNormalURL;
    }


    const [imageSrc, setImageSrc] = useState(url);

    const handleImageError = () => {
        setImageSrc(fallback);
    };

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