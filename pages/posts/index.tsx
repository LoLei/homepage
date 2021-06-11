import { GetServerSideProps } from 'next';
import React from 'react';
import Posts, { IPostMetaData } from '../../components/Posts';

const PostsPage = (props: IProps): JSX.Element => {
  return <Posts postListings={props.postListings} />;
};

export default PostsPage;

interface IProps {
  postListings: IPostMetaData[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const getListOfPosts = async (): Promise<IPostMetaData[]> => {
    const res = await fetch('https://api.github.com/repos/LoLei/posts/contents', {
      headers: new Headers({
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      }),
    });
    if (!res.ok) {
      // TODO: Error handling
      return [];
    }
    const data: any[] = await res.json();
    return data.map(({ name, sha, size, download_url }) => {
      return { name, sha, size, downloadUrl: download_url };
    });
  };

  const posts = await getListOfPosts();

  if (posts.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { postListings: posts },
  };
};
