import Nav from "../nav";
import styles from "../components/Sheetname.module.css"
import { google } from 'googleapis';

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

    const sheets = google.sheets({ version: 'v4', auth: jwt });

    const { sheetname } = query;
    const range = `Shiny Eggs!A7:C7`;
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

    const sheet = await sheets.spreadsheets.get({
        spreadsheetId
    });

    const sheetnames = sheet.data.sheets.map((sheet) => {
        return sheet.properties.title
    });

    /*const response = await sheets.spreadsheets.values.get({
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
            sheetnames
        }
    }
}

function Card(sheetnames) {
    console.log(sheetnames);
    const listEvents = sheetnames.map((title) =>
        <div className="event-card">
            <img className="card-img-top" src="..." alt="Card image cap"></img>
            <div className="card-body">
                <h6 className="card-title">{title}</h6>
            </div>
        </div>
    );

    return <div className="event-container">
        {listEvents}
    </div>
}

export default function Post({ sheetnames }) {
    return <div>
        <Nav />
        {Card(sheetnames) }
    </div>
}