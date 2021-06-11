import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { IPost } from '../../components/Posts';
import mockPosts from '../../resources/mock-posts.json';
import Post from '../../components/Post';

const PostPage = (props: IProps): JSX.Element => {
  return <Post postData={props.postData} />;
};

export default PostPage;

interface IProps {
  postData: IPost;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { pid } = context.query;
  const post = (mockPosts as IPost[]).find((p: IPost) => p.id === pid);

  if (post == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { postData: post },
  };
};
