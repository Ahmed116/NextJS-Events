import Decument, { Html, Head, Main, NextScript } from 'next/document'

class MyDecument extends Decument {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <body>
            <div id='overlays' />
            <Main />
            <NextScript />
          </body>
        </Head>
      </Html>
    )
  }
}

export default MyDecument
