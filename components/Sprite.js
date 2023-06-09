import Image from "next/image";
import { useEffect, useState } from "react";

export default function Sprite({ pokedexNr, height, width }) {
    if (pokedexNr === undefined || pokedexNr === "") return <p></p>;

    const swshNormalURL = `https://www.serebii.net/swordshield/pokemon/${pokedexNr}.png`;
    const svNormalURL = `https://www.serebii.net/scarletviolet/pokemon/new/${pokedexNr}.png`;
    const [imageSrc, setImageSrc] = useState(svNormalURL);

    const handleImageError = () => {
        setImageSrc(swshNormalURL);
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