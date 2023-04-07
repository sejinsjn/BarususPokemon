import Nav from "../nav";
import styles from "../components/Sheetname.module.css"
import { google } from 'googleapis';
import Image from 'next/image'
import Link from 'next/link'

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

    const { sheetname } = query;
    var spreadsheetId = "";

    switch (sheetname) {
        case "fortrade":
            spreadsheetId = process.env.SHEET_FORTRADE;
            break;
        case "gen8events":
            spreadsheetId = process.env.SHEET_GEN8;
            break;
        case "gen9events":
            spreadsheetId = process.env.SHEET_GEN9;
            break;
        case "mycollection":
            spreadsheetId = process.env.SHEET_MYCOLLECTION;
            break;
        default:
            spreadsheetId = process.env.SHEET_FORTRADE;
    }

    const spreadsheet = await googlesheets.spreadsheets.get({
        spreadsheetId
    });

    const sheets = spreadsheet.data.sheets;

    const sheetnames = spreadsheet.data.sheets.map((sheet) => {
        return sheet.properties.title
    });




    /*
    for (const sheet of sheets) {
        const title = sheet.properties.title;
        const values = sheet.values;
        console.log(sheet)
        const item = [];
        const range = `${ title }!A4:P4`;
    }
    const events = [];
    const pokedexNr = [];
    const shiny = [];

    for (const title of sheetnames) {
        const item = [];
        const range = `${title}!A4:P4`;
        const response = await googlesheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });
        item.push(title);
        item.push(response.data.values[0][0]);
        item.push(response.data.values[0][4]);
        events.push(item);
    }


    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range,
    });

    const [title, content] = response.data.values[0];
    console.log(title, content)

    return {
        props: {
            title,
            content
        }
    }*/

    return {
        props: {
            sheetname,
            sheetnames
        }
    }
}

function Card(sheet, sheetnames) {
    var id = 4;
    const listEvents = sheetnames.map((sheetname) =>
        <div className="event-card" key={ id++ }>
            
            <Link className="card-body" href={{
                pathname: `/sheet/[sheet]/[sheetname]`,
                query: { sheetname: sheetname }
            }}
                as={`/sheet/${sheet}/${sheetname}`}>
                <h6 className="card-title">{sheetname}</h6>
            </Link>
        </div>
    );

    return <div className="event-container">
        {listEvents}
    </div>
}

export default function Post({ sheetname, sheetnames }) {
    return <div>
        <Nav />
        {Card(sheetname, sheetnames) }
    </div>
}