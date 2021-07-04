import React from 'react';
import About from '../components/About';
import HeadComponent from '../components/HeadComponent';

const AboutPage = (): JSX.Element => {
  return (
    <>
      <HeadComponent title="Lorenz Leitner - About" />
      <About />
    </>
  );
};

export default AboutPage;
