import Nav from "../nav";
import { google } from 'googleapis';
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

    return {
        props: {
            sheetname,
            sheetnames
        }
    }
}

function Card(sheet, sheetnames) {
    var id = 4;
    const listEvents = sheetnames.map((sheetname, index) => {
        if (!sheetname.includes("Template")) {
            if (!sheetname.includes("Yahallo")) {
                return <div className="event-card" key={id++}>
                    <Link className="card-body" href={{
                        pathname: `/sheet/[sheet]/[sheetname]`,
                        query: { sheet: sheet, sheetname: sheetname, nextsheet: sheetnames[index+1] }
                    }}
                        as={`/sheet/${sheet}/${sheetname}`}>
                        <span className="event-link"></span>
                        <p className="card-title">{sheetname}</p>
                    </Link>
                </div>
            }
        }
    });

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