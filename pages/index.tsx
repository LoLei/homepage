import { GetServerSideProps } from 'next';
import React from 'react';
import HeadComponent from '../components/HeadComponent';
import Index from '../components/Index';
import Cache from '../util/cache/Cache';

const IndexPage = (props: IProps): JSX.Element => {
  return (
    <>
      <HeadComponent title="Lorenz Leitner - Homepage" />
      <Index email={props.email} />
    </>
  );
};

export default IndexPage;

interface IProps {
  email: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Initialize database/cache here so content is populated
  Cache.Instance;

  // This env var could be a NEXT_PUBLIC_* one, but it's a hassle
  // for the container, so pass it as a prop from the server instead
  return {
    props: { email: process.env.EMAIL_ADDRESS },
  };
};
