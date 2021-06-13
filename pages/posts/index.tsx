import { GetServerSideProps } from 'next';
import React from 'react';
import Posts from '../../components/Posts';
import { IRepositoryContentEntryMetadata } from '../../util/git/AbstractGitService';
import GithubService from '../../util/git/GithubService';

const PostsPage = (props: IProps): JSX.Element => {
  return <Posts postListings={props.postListings} />;
};

export default PostsPage;

interface IProps {
  postListings: IRepositoryContentEntryMetadata[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const githubService = new GithubService();
  const posts = await githubService.getRepositoryContentList('posts');

  if (posts.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { postListings: posts },
  };
};
