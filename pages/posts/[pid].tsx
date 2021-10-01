import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Post from '../../components/Post';
import { IRepositoryContentEntry } from '../../util/git/AbstractGitService';
import Cache from '../../util/cache/Cache';
import HeadComponent from '../../components/HeadComponent';

const PostPage = (props: IProps): JSX.Element => {
  /**
   * Gets the first line of the post content, assumes the h1 title is there and returns it.
   * @returns a properly formatted title
   */
  const getFormattedTitle = (): string => {
    return props.postData.content.split('\n')[0].substr(2);
  };

  return (
    <>
      <HeadComponent title={`Lorenz Leitner - ${getFormattedTitle()}`} />
      <Post postData={props.postData} />
    </>
  );
};

export default PostPage;

interface IProps {
  postData: IRepositoryContentEntry;
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // pid = post name
  const { pid } = context.query;

  const database = Cache.Instance;

  const repopulateIfNecessary = async (): Promise<void> => {
    if (await database.datastorePosts.needsRepopulate(pid as string)) {
      await database.datastorePosts.populate(pid as string);
    }
  };

  const post = await database.datastorePosts.get(pid as string);
  repopulateIfNecessary();

  if (post == null) {
    return {
      notFound: true,
    };
  }

  return {
    props: { postData: post },
  };
};
