import { google } from 'googleapis';
import Footer from "/components/Footer";
import Link from 'next/link'
import Header from "/components/Header";
import Table from "/components/Table";
import React, { useState, useEffect } from 'react';

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
    var showSheet = "";

    switch (sheetname) {
        case "fortrade":
            spreadsheetId = process.env.SHEET_FORTRADE;
            showSheet = "fortrade";
            break;
        case "gen8events":
            spreadsheetId = process.env.SHEET_GEN8;
            showSheet = "farmed";
            break;
        case "gen9events":
            spreadsheetId = process.env.SHEET_GEN9;
            showSheet = "farmed";
            break;
        case "mycollection":
            spreadsheetId = process.env.SHEET_MYCOLLECTION;
            showSheet = "mycollection";
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

    const spreadsheet = await googlesheets.spreadsheets.get({
        spreadsheetId,
        fields: "sheets.properties.title",
    });

    const sheetnames = spreadsheet?.data?.sheets?.map((sheet) => sheet?.properties?.title) || [];

    const tablehead = ['Pokemon', 'Characteristics', 'Other Info', 'Trade History', 'Disclosure'];

    const fields = {
        fortrade: [0, 5, 6, 2, 1, 3, 10, 9, 8, 11, 12, 13, 14, 15, 16, 17],
        farmed: [0, 4, 5, 3, 2, 1, 9, 8, 7, 10, 11, 12, 13, 14, 15, 16],
        mycollection: [0, 5, 6, 2, 1, 3, 10, 9, 8, 11, 12, 13, 14, 15, 16, 17],
    }

    context.res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');

    return {
        props: {
            tablehead,
            sheet: fields[showSheet],
            sheetJson,
            event,
            sheetname,
            sheetnames
        }
    }
}

function dropdownEvents(sheetnames, sheetname, event) {
    return (
        <div className="event-dropdown">
            <span>{event} <i className="fa-solid fa-chevron-down"></i></span>
            <div className="event-dropdown-content">
                {sheetnames.filter((sheet) => !sheet?.includes("Template") && !sheet?.includes("Yahallo"))
                .map((sheet) => (
                    <span key={sheet} className="event-dropdown-link">
                        <Link
                            key={sheet}
                            href={{ pathname: `/sheet/[sheetname]/[sheet]`, query: { sheetname, sheet } }}
                            as={`/sheet/${sheetname}/${sheet}`}
                        >
                            {sheet}
                        </Link>
                    </span>
                ))}
            </div>
        </div>
    );
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

export default function Post({ sheetnames, sheetname, event, sheetJson, tablehead, sheet }) {
    const size = useWindowSize();
    let device = "";
    if (size.width < 1000) {
        device = "mobile";
    } else {
        device = "desktop";
    }

    return (
        <div className="nextjs">
            <link rel="stylesheet" href="/static/css/index.css" />
            <Header navItems={navItems} />
            <main>
                <div className="table-nav">
                    <h3 className="event-name">{dropdownEvents(sheetnames, sheetname, event)}</h3>
                </div>
                <div className="event-table-container">
                    <Table head={tablehead} data={sheetJson} fields={sheet} device={device} />
                </div>
            </main>
            <Footer />
        </div>
    );
}