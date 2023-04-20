import Nav from "../nav";
import { google } from 'googleapis';
import Link from 'next/link'

export async function getServerSideProps({ query }) {
    try {
        const credential = JSON.parse(
            Buffer.from(process.env.GOOGLE_SERVICE_KEY, "base64").toString().replace(/\n/g, "")
        );

        const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
        const jwt = new google.auth.JWT(credential.client_email, null, credential.private_key, target);

        const googlesheets = google.sheets({ version: "v4", auth: jwt });

        const { sheetname } = query;
        let spreadsheetId = "";

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
            spreadsheetId,
            fields: "sheets.properties.title",
        });

        const sheetnames = spreadsheet?.data?.sheets?.map((sheet) => sheet?.properties?.title) || [];

        return {
            props: {
                sheetname,
                sheetnames,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                sheetname: "",
                sheetnames: [],
            },
        };
    }
}

function Card({ sheetname, sheetnames }) {
    const listEvents = sheetnames
        .filter((sheet) => !sheet?.includes("Template") && !sheet?.includes("Yahallo"))
        .map((sheet) => (
            <div className="event-card" key={sheet}>
                <Link
                    className="card-body"
                    href={{ pathname: `/sheet/[sheetname]/[sheet]`, query: { sheetname, sheet } }}
                    as={`/sheet/${sheetname}/${sheet}`}
                >
                    <span className="event-link"></span>
                    <p className="card-title">{sheet}</p>
                </Link>
            </div>
        ));

    return <div className="event-container">{listEvents}</div>;
}

export default function Post(props) {
    return (
        <div>
            <Nav />
            <Card {...props} />
        </div>
    );
}