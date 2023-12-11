import { google } from 'googleapis';
import React, { useState, useEffect } from 'react';
import Footer from "/components/Footer";
import Header from "/components/Header";
import Table from "/components/Table";

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

const tablehead = ['Pokemon', 'Characteristics', 'Other Info', 'Trade History', 'Disclosure'];

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

  let spreadsheetIds = [
    process.env.SHEET_FORTRADE,
    process.env.SHEET_GEN8,
    process.env.SHEET_GEN9,
    process.env.SHEET_MYCOLLECTION
  ];
  
  let fortradeData = [];
  let gen8Data = [];
  let gen9Data = [];
  let mycollectionData = [];

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
  
    // Store only the values from each sheet
    let sheetData = [];
    allSheetsData.forEach(response => {
      sheetData.push(...response.data.values);
    });
  
    // Add this array to allData
    switch(spreadsheetId){
      case  process.env.SHEET_FORTRADE:
        fortradeData.push(sheetData); 
        break;
      case  process.env.SHEET_GEN8:
        gen8Data.push(sheetData); 
        break;
      case  process.env.SHEET_GEN9:
        gen9Data.push(sheetData); 
        break;
      case  process.env.SHEET_MYCOLLECTION:
        mycollectionData.push(sheetData); 
        break;
    }
  }
    
  // Get all spreadsheets
  await Promise.all(spreadsheetIds.map(id => getAllSheets(id)));

  // Set Cache-Control header
  context.res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');

  return {
    props: {
      allData: [fortradeData, gen8Data, gen9Data, mycollectionData],
    },
  };
}
  
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
  });

  useEffect(() => {
      // only execute all the code below in client side
      // Handler to call on window resize
      function handleResize() {
          // Set window width/height to state
          setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
          });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default function Post({ allData }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const size = useWindowSize();
    let device = "";
    if (size.width < 1000) {
        device = "mobile";
    } else {
        device = "desktop";
    }
  
  const fields = {
    fortrade: [0, 5, 6, 2, 1, 3, 10, 9, 8, 11, 12, 13, 14, 15, 16, 17],
    farmed: [0, 4, 5, 3, 2, 1, 9, 8, 7, 10, 11, 12, 13, 14, 15, 16],
    mycollection: [0, 5, 6, 2, 1, 3, 10, 9, 8, 11, 12, 13, 14, 15, 16, 17],
  }
  
const handleInputChange = (event) => {
    const query = event.target.value;
    setQuery(query);
  
    if (query.length >= 3) {
      const lowerCaseQuery = query.toLowerCase();
  
      const fortradeResult = allData[0].flatMap((data,i) => data.filter(row => {
        // Check if the first value of the row is not empty
        if (row[0] === '' || row.length <=1) {
          return false;
        }
  
        const rowStr = row.join(' ').toLowerCase();
        return rowStr.includes(lowerCaseQuery);
      }));

      const gen8eventsResult = allData[1].flatMap((data,i) => data.filter(row => {
        // Check if the first value of the row is not empty
        if (row[0] === '' || row.length <=1) {
          return false;
        }
  
        const rowStr = row.join(' ').toLowerCase();
        return rowStr.includes(lowerCaseQuery);
      }));

      const gen9eventsResult = allData[2].flatMap((data,i) => data.filter(row => {
        // Check if the first value of the row is not empty
        if (row[0] === '' || row.length <=1) {
          return false;
        }
  
        const rowStr = row.join(' ').toLowerCase();
        return rowStr.includes(lowerCaseQuery);
      }));

      const mycollectionResult = allData[3].flatMap((data,i) => data.filter(row => {
        // Check if the first value of the row is not empty
        if (row[0] === '' || row.length <=1) {
          return false;
        }
  
        const rowStr = row.join(' ').toLowerCase();
        return rowStr.includes(lowerCaseQuery);
      }));
      
      results[0] = fortradeResult;
      results.push(gen8eventsResult);
      results.push(gen9eventsResult);
      results.push(mycollectionResult);

      setResults(results);
    } else {
      setResults([]);
    }
};
  
return (
<div className="nextjs">
        <link rel="stylesheet" href="/static/css/index.css" />
        <Header navItems={navItems} />
        <main>
            <div className="table-nav">
              <form onSubmit={(event) => event.preventDefault()}>
                <input
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Search..."
                  style={{
                    borderRadius: '8px',
                    padding: '10px',
                    margin: '20px'
                  }}
                />
              </form>
            </div>
            <div className="event-table-container">
              {results.length >= 1 && results[0].length > 0 && (
                <div className='result-container'>
                  <h2>Fortrade</h2>
                  <Table head={tablehead} data={results[0]} fields={fields["fortrade"]} device={device} />
                </div>
              )}

              {results.length >= 2 && results[1].length > 0 && (
                <div className='result-container'>
                  <h2>Gen 8 Events</h2>
                  <Table head={tablehead} data={results[1]} fields={fields["farmed"]} device={device} />
                </div>
              )}

              {results.length >= 3 && results[2].length > 0 && (
                <div className='result-container'>
                  <h2>Gen 9 Events</h2>
                  <Table head={tablehead} data={results[2]} fields={fields["farmed"]} device={device} />
                </div>
              )}

              {results.length >= 4 && results[3].length > 0 && (
                <div className='result-container'>
                  <h2>My Collection</h2>
                  <Table head={tablehead} data={results[3]} fields={fields["mycollection"]} device={device} />
                </div>
              )}
            </div>
        </main>
        <Footer />
    </div>
);
}
