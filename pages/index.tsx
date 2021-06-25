import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import Index from '../components/Index';

const IndexPage = (props: IProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Lorenz Leitner - Homepage</title>
      </Head>
      <Index email={props.email} />
    </>
  );
};

export default IndexPage;

interface IProps {
  email: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  // This env var could be a NEXT_PUBLIC_* one, but it's a hassle
  // for the container, so pass it as a prop from the server instead
  return {
    props: { email: process.env.EMAIL_ADDRESS },
  };
};
