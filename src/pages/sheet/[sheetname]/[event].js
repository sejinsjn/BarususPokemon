import Nav from "../../nav";
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

    const googlesheets = google.sheets({ version: 'v4', auth: jwt });

    const { event } = query;
    const { sheetname } = query;

    var spreadsheetId = "";
    var showEventName = false;

    switch (sheetname) {
        case "fortrade":
            spreadsheetId = process.env.SHEET_FORTRADE;
            showEventName = true;
            break;
        case "gen8events":
            spreadsheetId = process.env.SHEET_GEN8;
            showEventName = false;
            break;
        case "gen9events":
            spreadsheetId = process.env.SHEET_GEN9;
            showEventName = false;
            break;
        case "mycollection":
            spreadsheetId = process.env.SHEET_MYCOLLECTION;
            showEventName = true;
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

    return {
        props: {
            sheetJson,
            event,
            showEventName
        }
    }
}

function JsonDataDisplayTbody(showEventName, sheetJson) {
    var id = 4;

    if (showEventName)
        return sheetJson.map(
            (row) =>
                <tr key={id++}>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
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

    if (showEventName)
        return <tr>
            <th scope="col">Marking</th>
            <th scope="col">Lang</th>
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
            <th scope="col">Marking</th>
            <th scope="col">Lang</th>
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

export default function Post({ showEventName, event, sheetJson }) {
    return <div>
        <Nav />
        <h3 className="event-name">{event}</h3>
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