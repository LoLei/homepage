import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Post from '../../components/Post';
import { IRepositoryContentEntry } from '../../util/git/AbstractGitService';
import Database from '../../util/db/Database';

const PostPage = (props: IProps): JSX.Element => {
  return <Post postData={props.postData} />;
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

  const database = Database.Instance;

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
