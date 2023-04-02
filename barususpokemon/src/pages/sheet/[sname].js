import { google } from 'googleapis';

export async function getServerSideProps({ query }) {

    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

    const sheets = google.sheets({ version: 'v4', auth });

    const { sname } = query;
    const range = `Shiny Eggs!A${sname}:C${sname}`;

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_FORTRADE,
        range,
    });

    const [title, content] = response.data.values[0];
    console.log(title, content)

    return {
        props: {
            title,
            content
        }
    }
}

export default function Post({ title, content }) {
    return <article>
        <h1>{title}</h1>
        <div>{content}</div>
    </article>
}