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

    let timeTaken = Date.now() - start;
    console.log("Total time taken : " + timeTaken + " milliseconds");

    return {
        props: {
            sheetJson,
            event,
            showEventName,
            sheetname
        }
    }
}

function JsonDataDisplayTbody(showEventName, sheetJson) {
    var id = 4;

    if (showEventName == "farmed")
        return sheetJson.map(
            (row) =>
                <tr key={id++}>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{displaySprite(row[0], row[4])}</td>
                    <td>{row[5]}</td>
                    <td>{row[7]}</td>
                    <td>{row[8]}</td>
                    <td>{row[9]}</td>
                    <td>{row[10]}</td>
                    <td>{row[11]}</td>
                    <td>{row[12]}</td>
                    <td>{row[13]}</td>
                    <td>{row[14]}</td>
                    <td>{row[15]}</td>
                    <td>{row[16]}</td>
                    <td>{row[17]}</td>
                </tr >
        )
    else
        if (showEventName == "fortrade")
            return sheetJson.map(
                (row) =>
                    <tr key={id++}>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                        <td>{displaySprite(row[0], row[5])}</td>
                        <td>{row[3]}</td>
                        <td>{row[6]}</td>
                        <td>{row[8]}</td>
                        <td>{row[9]}</td>
                        <td>{row[10]}</td>
                        <td>{row[11]}</td>
                        <td>{row[12]}</td>
                        <td>{row[13]}</td>
                        <td>{row[14]}</td>
                        <td>{row[15]}</td>
                        <td>{row[16]}</td>
                        <td>{row[17]}</td>
                    </tr >
            )
        else
            return sheetJson.map(
                (row) =>
                    <tr key={id++}>
                        <td>{row[1]}</td>
                        <td>{displaySprite(row[0], row[4])}</td>
                        <td>{row[2]}</td>
                        <td>{row[5]}</td>
                        <td>{row[7]}</td>
                        <td>{row[8]}</td>
                        <td>{row[9]}</td>
                        <td>{row[10]}</td>
                        <td>{row[11]}</td>
                        <td>{row[12]}</td>
                        <td>{row[13]}</td>
                        <td>{row[14]}</td>
                        <td>{row[15]}</td>
                        <td>{row[16]}</td>
                    </tr >
            )
}

function JsonDataDisplayThead(showEventName) {
    var id = 4;

    if (showEventName == "farmed")
        return <tr>
            <th scope="col">Marking</th>
            <th scope="col">Lang</th>
            <th scope="col">Sprite</th>
            <th scope="col">Ball</th>
            <th scope="col">Ability</th>
            <th scope="col">Nature</th>
            <th scope="col">Lvl</th>
            <th scope="col">Gender</th>
            <th scope="col">IVs</th>
            <th scope="col">OT/ID</th>
            <th scope="col">Date</th>
            <th scope="col">Proof</th>
            <th scope="col">Trade History</th>
            <th scope="col">Disclosure</th>
        </tr>
    else
        if (showEventName == "fortrade")
            return <tr>
                <th scope="col">Marking</th>
                <th scope="col">Lang</th>
                <th scope="col">Sprite</th>
                <th scope="col">Event</th>
                <th scope="col">Ball</th>
                <th scope="col">Ability</th>
                <th scope="col">Nature</th>
                <th scope="col">Lvl</th>
                <th scope="col">Gender</th>
                <th scope="col">IVs</th>
                <th scope="col">OT/ID</th>
                <th scope="col">Date</th>
                <th scope="col">Proof</th>
                <th scope="col">Trade History</th>
                <th scope="col">Disclosure</th>
            </tr>
        else
            return <tr>
                <th scope="col">Lang</th>
                <th scope="col">Sprite</th>
                <th scope="col">Event</th>
                <th scope="col">Ball</th>
                <th scope="col">Ability</th>
                <th scope="col">Nature</th>
                <th scope="col">Lvl</th>
                <th scope="col">Gender</th>
                <th scope="col">IVs</th>
                <th scope="col">OT/ID</th>
                <th scope="col">Date</th>
                <th scope="col">Proof</th>
                <th scope="col">Trade History</th>
                <th scope="col">Disclosure</th>
            </tr>
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
            alt={ pokedexNr }
        />
    );
}

export default function Post({ showEventName, event, sheetJson, sheetname }) {
    return <div>
        <Nav />
        <div className="table-nav">
            <h3 className="event-name">{event}</h3>
        </div>
        <div className="event-table-container">
            <table className="event-table">
                <thead>
                    {JsonDataDisplayThead(showEventName)}
                </thead>
                <tbody>
                    {JsonDataDisplayTbody(showEventName, sheetJson)}
                </tbody>
            </table>
        </div>
    </div>
}