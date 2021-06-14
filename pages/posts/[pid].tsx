import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Post from '../../components/Post';
import { IRepositoryContentEntry } from '../../util/git/AbstractGitService';
import GitDelegator from '../../util/git/GitDelegator';

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
  const gitService = GitDelegator.Instance;
  const post = await gitService.getRepositoryFileContent(`https://github.com/LoLei/posts/${pid}`);

  if (post == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { postData: post },
  };
};
