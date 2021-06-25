import Head from 'next/head';
import React from 'react';
import About from '../components/About';

const AboutPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Lorenz Leitner - About</title>
      </Head>
      <About />
    </>
  );
};

export default AboutPage;
