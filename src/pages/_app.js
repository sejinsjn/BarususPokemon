import '@/styles/global.css'
import { Analytics } from '@vercel/analytics/react';
import Script from "next/script";

export default function App({ Component, pageProps }) {
    return (
        <>
            <link rel="stylesheet" href="/static/css/footer.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <Script src="https://kit.fontawesome.com/90776f91b0.js" crossorigin="anonymous" />
            <Component {...pageProps} />
            <Analytics/>
        </>
    );
}
