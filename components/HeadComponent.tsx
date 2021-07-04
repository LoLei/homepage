import Head from 'next/head';
import React from 'react';

const HeadComponent = (props: IProps): JSX.Element => {
  return (
    <Head>
      <title>{props.title}</title>

      <meta name="title" content="Lorenz Leitner - Homepage" />
      <meta
        name="description"
        content="Website of Lorenz Leitner - Software Developer from Austria"
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://lolei.dev/" />
      <meta property="og:title" content="Lorenz Leitner - Homepage" />
      <meta
        property="og:description"
        content="Website of Lorenz Leitner - Software Developer from Austria"
      />
      <meta property="og:image" content="https://lolei.dev/static/meta.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://lolei.dev/" />
      <meta property="twitter:title" content="Lorenz Leitner - Homepage" />
      <meta
        property="twitter:description"
        content="Website of Lorenz Leitner - Software Developer from Austria"
      />
      <meta property="twitter:image" content="https://lolei.dev/static/meta.png" />
    </Head>
  );
};

export default HeadComponent;

interface IProps {
  title: string;
}
