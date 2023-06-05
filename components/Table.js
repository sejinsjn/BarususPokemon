import styles from './Table.module.css';
import Image from 'next/image'
import React, { useState } from 'react';

export default function Table({ head, data, fields, device }) {

    if (device == "desktop") {
        return (
            <table className={styles.tableDesktop}>
                {Tablehead(head)}
                <tbody>
                    {TableBody(data, fields)}
                </tbody>
            </table>
        );
    }

    return (
        <table className={styles.tableMobile}>
            <thead>
                <tr >
                    <th scope="col">
                        Pokemon
                    </th>
                </tr>
            </thead>
            <tbody>
                {TableMobile(data, fields)}
            </tbody>
        </table>
    );
}

function Tablehead(names) {
    return (
        <thead>
            <tr>
                {names.map((names) => (
                    <th key={names} scope="col">
                        {names}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

function TableBody(data, fields) {
    let id = 4;

    return data.map((row) => (
        <tr key={id++}>
            <td>
                <div className={styles.event }>
                    <div className={styles.sprite}>
                        <div>
                            {displaySprite(row[fields[0]], row[fields[1]], 75, 75)}
                            {displayBall(row[fields[2]], 40, 40)}
                        </div>
                        <div className={styles.lang }>
                            <p>{row[fields[3]]}</p>
                            <p>{row[fields[4]]}</p>
                        </div>
                    </div>
                    <div className={styles.eventname}>
                        {row[fields[5]]}
                    </div>
                </div>
            </td>
            <td>
                <div className={styles.characteristics}>
                    <div>
                        <p>Lv. {row[fields[6]]}</p>
                        <p>{row[fields[7]]}</p>
                        <p>{row[fields[8]]}</p>
                        <p>{row[fields[10]]}</p>
                    </div>
                    <p>
                        {genderIcon(row[fields[9]])}
                    </p>
                </div>
                <p className={styles.ivs}>
                </p>
            </td>
            <td>
                <div className={styles.r3 }>
                    <div>
                        <p>{row[fields[11]]}</p>
                        <p>{row[fields[12]]}</p>
                        <p>{row[fields[13]]}</p>
                    </div>
                </div>
            </td>
            <td>
                <p className={styles.tradehistory}>
                    {row[fields[14]]}
                </p>
            </td>
            <td>
                <p className={styles.disclosure}>
                    {row[fields[15]]}
                </p>
            </td>
        </tr>
    ));
}

function TableMobile(data, fields) {

    const [expandedRows, setExpandedRows] = useState([]);

    const toggleRow = (index) => {
        const icon = document.getElementById(index);
        if (icon.classList.contains("fa-rotate-180")) {
            icon.classList.remove("fa-rotate-180")
        } else {
            icon.classList.add("fa-rotate-180");
        }
        
        if (expandedRows.includes(index)) {
            setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !== index));
        } else {
            setExpandedRows([...expandedRows, index]);
        }
    };

    const renderRow = (row, index) => {
        const isExpanded = expandedRows.includes(index);

        return (
            <>
                <tr>
                    <td>
                        <div className={styles.event} >
                            <div className={styles.sprite}>
                                <div>
                                    {displaySprite(row[fields[0]], row[fields[1]], 75, 75)}
                                    {displayBall(row[fields[2]], 40, 40)}
                                </div>
                                <div className={styles.lang}>
                                    <p>{row[fields[3]]}</p>
                                    <p>{row[fields[4]]}</p>
                                </div>
                            </div>
                            <div className={styles.eventname}>{row[fields[5]]}</div>
                            <div>
                                <i id={index } className="fa-solid fa-chevron-down"
                                    onClick={() => toggleRow(index)}></i>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr className={expandedRows.includes(index) ? index % 2 === 1 ? styles.show : styles.oddShow : styles.hidden} >
                    <td>
                        <div className={styles.charR3Mobile}>
                            <div className={styles.characteristics}>
                                <div>
                                    <p>Lv. {row[fields[6]]}</p>
                                    <p>{row[fields[7]]}</p>
                                    <p>{row[fields[8]]}</p>
                                    <p>{row[fields[10]]}</p>
                                </div>
                                <p>{genderIcon(row[fields[9]])}</p>
                            </div>
                            <div className={styles.r3}>
                                <div>
                                    <p>{row[fields[11]]}</p>
                                    <p>{row[fields[12]]}</p>
                                    <p>{row[fields[13]]}</p>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr className={expandedRows.includes(index) ? index % 2 === 1 ? styles.show : styles.oddShow : styles.hidden} >
                    <td>
                        <p className={styles.tradehistory}>{row[fields[14]]}</p>
                    </td>
                </tr>
                <tr className={expandedRows.includes(index) ? index % 2 === 1 ? styles.show : styles.oddShow : styles.hidden} >
                    <td>
                        <p className={styles.disclosure}>{row[fields[15]]}</p>
                    </td>
                </tr>
            </>
        );
    };

    return data.map((row, index) => (
        <React.Fragment key={index}>
            {renderRow(row, index)}
        </React.Fragment>
    ));
}



function displaySprite(pokedexNr, isShiny, height, width) {
    if (pokedexNr === undefined || pokedexNr === "") return <p></p>;

    const swshShinyURL = "https://www.serebii.net/Shiny/SWSH/";
    const swshNormalURL = "https://www.serebii.net/swordshield/pokemon/";
    const svShinyURL = "https://www.serebii.net/Shiny/SV/new/";
    const svNormalURL = "https://www.serebii.net/scarletviolet/pokemon/new/";

    if (parseInt(pokedexNr) <= 905)
        if (isShiny == "TRUE")
            return loadIMG(swshShinyURL, pokedexNr, height, width);
        else
            return loadIMG(swshNormalURL, pokedexNr, height, width);
    else
        if (isShiny == "TRUE")
            return loadIMG(svShinyURL, pokedexNr, height, width);
        else
            return loadIMG(svNormalURL, pokedexNr, height, width);
}

function displayBall(ball, height, width) {
    if (ball === undefined || ball === "") return <p></p>;

    const ballURL = "https://www.serebii.net/itemdex/sprites/pgl/";

    return loadIMG(ballURL, ball.toLowerCase() + "ball", height, width);
}

function loadIMG(url, sprite, height, width) {
    const loadSprite = ({ src }) => {
        return `${url}${sprite}.png`;
    }

    return (
        <Image
            loader={loadSprite}
            className="tableSprite"
            src={`${url}${sprite}.png`}
            width={height}
            height={width}
            unoptimized
            alt={sprite}
        />
    );
}

function genderIcon(gender) {
    if (gender == "Male") {
        return (
            <span id="boot-icon" className="bi-xs bi-gender-male"
                style={{
                    fontSize: '0.75rem',
                    border: 'hidden',
                    borderRadius: '24%',
                    backgroundColor: 'rgb(0, 123, 255)',
                    color: 'rgb(255, 255, 255)',
                    padding: '4px'
                }}></span>
        );
    }

    if (gender == "Female") {
        return (
            <span id="boot-icon" className="bi-xs bi-gender-female"
                style={{
                    fontSize: '0.75rem',
                    color: 'rgb(255, 255, 255)',
                    WebkitTextStrokeWidth: '0px',
                    border: 'hidden',
                    borderRadius: '24%',
                    padding: '4px',
                    backgroundColor: 'rgb(254, 0, 161)'
                }} ></span>
        );
    }

    return (
        <span id="boot-icon" className="bi-xs bi-dash-lg"
            style={{
                fontSize: '0.75rem',
                border: 'hidden',
                borderRadius: '24%',
                backgroundColor: 'rgb(128, 128, 128)',
                color: 'rgb(255, 255, 255)',
                padding: '4px'
            }}></span>
    );
}