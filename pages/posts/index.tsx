import { GetServerSideProps } from 'next';
import React from 'react';
import Posts from '../../components/Posts';
import Cache from '../../util/cache/Cache';
import { IRepositoryContentEntryMetadata } from '../../util/git/AbstractGitService';

const PostsPage = (props: IProps): JSX.Element => {
  return <Posts postListings={props.postListings} />;
};

export default PostsPage;

interface IProps {
  postListings: IRepositoryContentEntryMetadata[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const database = Cache.Instance;

  if (await database.datastorePostList.needsRepopulate()) {
    await database.datastorePostList.populate();
  }

  const posts = await database.datastorePostList.getAll();

  if (posts == null || posts.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      postListings: posts.sort((a, b) => {
        return a.name > b.name ? -1 : 1;
      }),
    },
  };
};
