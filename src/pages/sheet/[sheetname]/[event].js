import Nav from "../../nav";
import { google } from 'googleapis';
import Image from 'next/image'
import Link from 'next/link'
import { Router } from 'next/router';

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

    const range = `${event}!A4:S`;
    const sheet = await googlesheets.spreadsheets.values.get({
        spreadsheetId,
        range
    });

    const sheetJson = sheet.data.values;

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
            sheetJson
        }
    }
}

function JsonDataDisplay(sheetJson) {
    var id = 4;
    const DisplayData = sheetJson.map(
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
                <td>{row[18]}</td>
            </tr >
        )

    return <tbody>
        {DisplayData}
    </tbody>
}

export default function Post({ sheetJson }) {
    return <div>
        <Nav />
        <div>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
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
                        <th scope="col">Rule3 CopyPasta</th>
                    </tr>
                </thead>
                    {JsonDataDisplay(sheetJson)}
            </table>
        </div>
    </div>
}