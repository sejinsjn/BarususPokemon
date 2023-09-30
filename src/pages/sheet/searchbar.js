import { google } from 'googleapis';
import React, { useState, useEffect } from 'react';
import Footer from "/components/Footer";
import Link from 'next/link'
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

      const results = allData.filter(row => {
        // Check if the first value of the row is not empty
        if (row[0] === '' || row.length <= 1) {
          return false;
        }

        const rowStr = row.join(' ').toLowerCase();
        return rowStr.includes(lowerCaseQuery);
      });
      console.log(results);
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
                    />
                  </form>
                </div>
                <div className="event-table-container">
                  <Table head={tablehead} data={results} fields={fields["fortrade"]} device={device} />
                </div>
            </main>
            <Footer />
        </div>
  );
}
