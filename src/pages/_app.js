import '@/styles/global.css'
import { Analytics } from '@vercel/analytics/react';
import Script from "next/script";

export default function App({ Component, pageProps }) {
    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"/>
            <Script src="https://kit.fontawesome.com/90776f91b0.js" crossorigin="anonymous" />
            <Component {...pageProps} />
            <Analytics/>
        </>
    );
}
