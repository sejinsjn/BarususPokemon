import Nav from "../../nav";
import { google } from 'googleapis';
import Link from 'next/link'
import Image from 'next/image'

export async function getServerSideProps({ query }) {

    let start = Date.now();

    const credential = JSON.parse(
        Buffer.from(process.env.GOOGLE_SERVICE_KEY, "base64").toString().replace(/\n/g, "")
    );

    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
        credential.client_email,
        null,
        credential.private_key,
        target
    );

    const googlesheets = google.sheets({ version: 'v4', auth: jwt });

    const { event } = query;
    const { sheetname } = query;

    var spreadsheetId = "";
    var showEventName = false;

    switch (sheetname) {
        case "fortrade":
            spreadsheetId = process.env.SHEET_FORTRADE;
            showEventName = "fortrade";
            break;
        case "gen8events":
            spreadsheetId = process.env.SHEET_GEN8;
            showEventName = "farmed";
            break;
        case "gen9events":
            spreadsheetId = process.env.SHEET_GEN9;
            showEventName = "farmed";
            break;
        case "mycollection":
            spreadsheetId = process.env.SHEET_MYCOLLECTION;
            showEventName = "mycollection";
            break;
        default:
            spreadsheetId = process.env.SHEET_FORTRADE;
    }

    const range = `${event}!A4:S`;
    const sheet = await googlesheets.spreadsheets.values.get({
        spreadsheetId,
        range
    });

    const sheetJson = sheet.data.values;

    const tablehead = {
        farmed: ['Marking', 'Lang', 'Sprite', 'Ball', 'Ability', 'Nature', 'Lvl', 'Gender', 'IVs', 'OT/ID', 'Date', 'Proof', 'Trade History', 'Disclosure'],
        fortrade: ['Marking', 'Lang', 'Event', 'Sprite', 'Ball', 'Ability', 'Nature', 'Lvl', 'Gender', 'IVs', 'OT/ID', 'Date', 'Proof', 'Trade History', 'Disclosure'],
        mycollection: ['Lang', 'Event', 'Sprite', 'Ball', 'Ability', 'Nature', 'Lvl', 'Gender', 'IVs', 'OT/ID', 'Date', 'Proof', 'Trade History', 'Disclosure'],
        default: ['Lang', 'Pokemon', 'Sprite', 'Ball', 'Ability', 'Nature', 'Lvl', 'Gender', 'IVs', 'OT/ID', 'Date', 'Proof', 'Trade History', 'Disclosure'],
    };

    const tablebody = {
        farmed: [1, 2, [0, 4], 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        fortrade: [1, 2, 3, [0, 5], 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        mycollection: [1, 2, [0, 4], 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        fortradeNE: [2, 3, [0, 5], 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        default: [1, 2, [0, 4], 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    };

    return {
        props: {
            tablehead,
            tablebody,
            sheetJson,
            event,
            showEventName,
            sheetname
        }
    }
}

function JsonDataDisplayTbody(showEventName, sheetJson, event, fields) {
    let id = 4;
    let fieldIndices = "";
    switch (event) {
        case 'Shiny Eggs':
        case 'Shiny Mythicals':
            fieldIndices = fields.fortradeNE;
            break;
        case 'Living Dex':
            fieldIndices = fields.default;
            break;
        default:
            fieldIndices = fields[showEventName] || fields.default;
            break;
    }

    return sheetJson.map((row) => (
        <tr key={id++}>
            {fieldIndices.map((field, index) => (
                <td key={index}>{Array.isArray(field) ? displaySprite(row[field[0]], row[field[1]]) : row[field]}</td>
            ))}
        </tr>
    ));
}

function JsonDataDisplayThead(showEventName, event, fields) {
    let fieldNames = "";
    switch (event) {
        case 'Shiny Eggs':
        case 'Shiny Mythicals':
        case 'Living Dex':
            fieldNames = fields.default;
            break;
        default:
            fieldNames = fields[showEventName] || fields.default;
            break;
    }

    return (
        <tr>
            {fieldNames.map((fieldName) => (
                <th key={fieldName} scope="col">
                    {fieldName}
                </th>
            ))}
        </tr>
    );
}


function displaySprite(pokedexNr, isShiny) {
    if (pokedexNr === undefined || pokedexNr === "") return <p></p>;

    const swshShinyURL = "https://www.serebii.net/Shiny/SWSH/";
    const swshNormalURL = "https://www.serebii.net/swordshield/pokemon/";
    const svShinyURL = "https://www.serebii.net/Shiny/SV/new/";
    const svNormalURL = "https://www.serebii.net/scarletviolet/pokemon/new/";

    if (parseInt(pokedexNr) <= 905)
        if (isShiny == "TRUE")
            return loadIMG(swshShinyURL, pokedexNr);
        else
            return loadIMG(swshNormalURL, pokedexNr);
    else
        if (isShiny == "TRUE")
            return loadIMG(svShinyURL, pokedexNr);
        else
            return loadIMG(svNormalURL, pokedexNr);
}

function loadIMG(url, pokedexNr) {
    const loadSprite = ({ src }) => {
        return `${url}${pokedexNr}.png`;
    }

    return (
        <Image
            loader={loadSprite}
            className="tableSprite"
            src={`${url}${pokedexNr}.png`}
            width={50}
            height={50}
            unoptimized
            alt={pokedexNr}
        />
    );
}

export default function Post({ showEventName, event, sheetJson, tablebody, tablehead }) {
    return <div>
        <Nav />
        <div className="table-nav">
            <h3 className="event-name">{event}</h3>
        </div>
        <div className="event-table-container">
            <table className="event-table">
                <thead>
                    {JsonDataDisplayThead(showEventName, event, tablehead)}
                </thead>
                <tbody>
                    {JsonDataDisplayTbody(showEventName, sheetJson, event, tablebody)}
                </tbody>
            </table>
        </div>
    </div>
}