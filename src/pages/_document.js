import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
      <Html lang="en">
          <Head>
           <style dangerouslySetInnerHTML={{
                  __html: `</style>
          <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <style>`
              }}></style>
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
  )
}
