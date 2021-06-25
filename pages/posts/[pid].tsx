import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Post from '../../components/Post';
import { IRepositoryContentEntry } from '../../util/git/AbstractGitService';
import Cache from '../../util/cache/Cache';
import Head from 'next/head';

const PostPage = (props: IProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Lorenz Leitner - {props.postData.fileName}</title>
      </Head>
      <Post postData={props.postData} />
    </>
  );
};

export default PostPage;

interface IProps {
  postData: IRepositoryContentEntry;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // pid = post name
  const { pid } = context.query;

  const database = Cache.Instance;

  if (await database.datastorePosts.needsRepopulate(pid as string)) {
    await database.datastorePosts.populate(pid as string);
  }

  const post = await database.datastorePosts.get(pid as string);

  if (post == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { postData: post },
  };
};
