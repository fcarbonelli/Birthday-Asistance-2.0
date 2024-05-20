import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "Birthday Assistance",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <head>
      <link rel="Icon" href="/favicon/favicon.ico"/>
    </head>
    <body>
      <Analytics />
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
