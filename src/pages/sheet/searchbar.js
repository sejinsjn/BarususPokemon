import { google } from 'googleapis';

export async function getServerSideProps(context) {
    // Fetch data from API
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
  
    let fortradeSpreadSheetId = process.env.SHEET_FORTRADE;
    let gen8eventsSpreadSheetId = process.env.SHEET_GEN8;
    let gen9eventsSpreadSheetId = process.env.SHEET_GEN9;
    let mycollectionSpreadSheetId = process.env.SHEET_MYCOLLECTION;
  
    let allData = [];
  
    async function getAllSheets(spreadsheetId) {
        // Get the spreadsheet details
        const spreadsheet = await googlesheets.spreadsheets.get({
          spreadsheetId,
        });
      
        // Get the names of all sheets in the spreadsheet
        const sheetNames = spreadsheet.data.sheets.map(sheet => sheet.properties.title);
      
        // Create an array of promises
        const promises = sheetNames.map(sheetName => 
          googlesheets.spreadsheets.values.get({
            spreadsheetId,
            range: sheetName,
          })
        );
      
        // Wait for all promises to resolve
        const allSheetsData = await Promise.all(promises);
      
        // Store the data from each sheet
        allSheetsData.forEach(response => {
          allData.push(...response.data.values);
        });
      }
      
  
    // Get all spreadsheets
    await getAllSheets(fortradeSpreadSheetId);
    await getAllSheets(gen8eventsSpreadSheetId);
    await getAllSheets(gen9eventsSpreadSheetId);
    await getAllSheets(mycollectionSpreadSheetId);
  
    // Set Cache-Control header
    context.res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  
    return {
      props: {
        allData: allData,
      },
    };
  }
  


export default function Post({ allData }) {
    function search(query) {
        // Make the query case-insensitive
        query = query.toLowerCase();

        const results = allData.filter(row => {
        // Convert the row to a string and make it case-insensitive
        const rowStr = row.join(' ').toLowerCase();

        // Check if the row contains the query
        return rowStr.includes(query);
        });

        return results;
    }

    return (
        <div className="nextjs">
            {search("pikachu").map((row, index) => (
                <div key={index}>
                {row.map((cell, i) => (
                    <span key={i}>{cell} </span>
                ))}
                </div>
            ))}
        </div>
    );
}