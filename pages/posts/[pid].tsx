import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { IPost } from '../../components/Posts';
import Post from '../../components/Post';

const PostPage = (props: IProps): JSX.Element => {
  console.log(props.postData);
  return <Post postData={props.postData} />;
};

export default PostPage;

interface IProps {
  postData: IPost;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const getPostContent = async (postName: string): Promise<IPost | undefined> => {
    const res = await fetch(`https://api.github.com/repos/LoLei/posts/contents/${postName}`, {
      headers: new Headers({
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3.raw',
      }),
    });
    if (!res.ok) {
      console.error(res.status, res.statusText);
      return undefined;
    }
    const data: string = await res.text();
    return { id: postName, fileName: postName, content: data };
  };

  const { pid } = context.query;
  const post = await getPostContent(pid as string);

  if (post == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { postData: post },
  };
};
