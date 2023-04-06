import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/global.css'
import { useEffect } from "react";


export default function App({ Component, pageProps }) {
    useEffect(() => {
        require("jquery/dist/jquery.min.js");
        require("bootstrap/dist/js/bootstrap.min.js");
    }, []);

    return <Component {...pageProps} />
}
