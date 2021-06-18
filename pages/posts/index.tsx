import { GetServerSideProps } from 'next';
import React from 'react';
import Posts from '../../components/Posts';
import Database from '../../util/db/Database';
import { IRepositoryContentEntryMetadata } from '../../util/git/AbstractGitService';

const PostsPage = (props: IProps): JSX.Element => {
  return <Posts postListings={props.postListings} />;
};

export default PostsPage;

interface IProps {
  postListings: IRepositoryContentEntryMetadata[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const database = Database.Instance;

  if (await database.datastorePostListNeedsRepopulate()) {
    await database.populatePostList();
  }

  const posts = await database.getPostList();

  if (posts == null || posts.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { postListings: posts },
  };
};
