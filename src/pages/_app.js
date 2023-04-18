import '@/styles/global.css'
import { Analytics } from '@vercel/analytics/react';

export function reportWebVitals(metric) {
    console.log(metric)
}

export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Analytics/>
        </>
    );
}
