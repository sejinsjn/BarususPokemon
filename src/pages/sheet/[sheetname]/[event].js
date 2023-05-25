import { google } from 'googleapis';
import Footer from "/components/Footer";
import Image from 'next/image'
import Link from 'next/link'
import Header from "/components/Header";

const navItems = [
    {
        url: '/',
        label: 'Home'
    },
    {
        url: '/sheet/fortrade',
        label: 'For Trade'
    },
    {
        url: '/sheet/gen8events',
        label: 'Gen 8'
    },
    {
        url: '/sheet/gen9events',
        label: 'Gen 9'
    },
    {
        url: '/sheet/mycollection',
        label: 'My Collection'
    }
];

export async function getServerSideProps({ query }) {
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

    const spreadsheet = await googlesheets.spreadsheets.get({
        spreadsheetId,
        fields: "sheets.properties.title",
    });

    const sheetnames = spreadsheet?.data?.sheets?.map((sheet) => sheet?.properties?.title) || [];

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
            sheetname,
            sheetnames
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

function DisplayTableOnDesktop(showEventName, sheetJson, event, tablehead, tablebody) {
    
    return (<table className="event-table">
        <thead>
            {JsonDataDisplayThead(showEventName, event, tablehead)}
        </thead>
        <tbody>
            {JsonDataDisplayTbody(showEventName, sheetJson, event, tablebody)}
        </tbody>
    </table>);
}

function DisplayTableOnMobile(showEventName, sheetJson, event, tablehead, tablebody) {
    console.log("mobile");
    return (<table className="event-table">
        <thead>
            {JsonDataDisplayThead(showEventName, event, tablehead)}
        </thead>
        <tbody>
            {JsonDataDisplayTbody(showEventName, sheetJson, event, tablebody)}
        </tbody>
    </table>);
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

function dropdownEvents(sheetnames, sheetname, event) {
    return (
        <div className="event-dropdown">
            <span>{event} <i class="fa-solid fa-chevron-down"></i></span>
            <div className="event-dropdown-content">
                {sheetnames.filter((sheet) => !sheet?.includes("Template") && !sheet?.includes("Yahallo"))
                .map((sheet) => (
                    <span key={sheet} className="event-dropdown-link">
                        <Link
                            key={sheet}
                            href={{ pathname: `/sheet/[sheetname]/[sheet]`, query: { sheetname, sheet } }}
                            as={`/sheet/${sheetname}/${sheet}`}
                        >
                            {sheet}
                        </Link>
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function Post({ sheetnames, sheetname, showEventName, event, sheetJson, tablebody, tablehead }) {
    return (
        <div className="nextjs">
            <link rel="stylesheet" href="/static/css/index.css" />
            <Header navItems={navItems} />
            <main>
                <div className="table-nav">
                    <h3 className="event-name">{dropdownEvents(sheetnames, sheetname, event)}</h3>
                </div>
                <div className="event-table-container">
                    {DisplayTableOnDesktop(showEventName, sheetJson, event, tablehead, tablebody)}
                </div>
            </main>
            <Footer />
        </div>
    );
}