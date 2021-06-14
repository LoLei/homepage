import { GetServerSideProps } from 'next';
import React from 'react';
import Posts from '../../components/Posts';
import { IRepositoryContentEntryMetadata } from '../../util/git/AbstractGitService';
import GitDelegator from '../../util/git/GitDelegator';

const PostsPage = (props: IProps): JSX.Element => {
  return <Posts postListings={props.postListings} />;
};

export default PostsPage;

interface IProps {
  postListings: IRepositoryContentEntryMetadata[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const gitService = GitDelegator.Instance;
  const posts = await gitService.getRepositoryContentList('https://github.com/LoLei/posts');

  if (posts.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { postListings: posts },
  };
};
