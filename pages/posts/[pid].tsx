import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Post from '../../components/Post';
import GithubService from '../../util/git/GithubService';
import { IRepositoryContentEntry } from '../../util/git/AbstractGitService';

const PostPage = (props: IProps): JSX.Element => {
  return <Post postData={props.postData} />;
};

export default PostPage;

interface IProps {
  postData: IRepositoryContentEntry;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  // TODO: Rename pid to postName or something
  const { pid } = context.query;
  const githubService = new GithubService();
  const post = await githubService.getRepositoryFileContent('posts', pid as string);

  if (post == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { postData: post },
  };
};
