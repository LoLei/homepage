import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { IPost } from '../../components/Posts';
import mockPosts from '../../resources/mock-posts.json';

const Post = (props: IProps): JSX.Element => {
  return <p>Post: {props.postData.fileName}</p>;
};

export default Post;

interface IProps {
  postData: IPost;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { pid } = context.query;
  const post = (mockPosts as IPost[]).find((p: IPost) => p.id === parseInt(pid as string));

  if (post == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { postData: post },
  };
};
