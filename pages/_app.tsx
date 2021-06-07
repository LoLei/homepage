import React from 'react';
import '../styles/all.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Lorenz Leitner</title>
      </Head>
      <div className="container">
        <div className="header">
          <Header />
        </div>
        <div className="main">
          <Component {...pageProps} />
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
