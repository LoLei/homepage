import React from 'react';
import { IRepositoryMetadata } from '../util/git/AbstractGitService';
import { FaStar } from 'react-icons/fa';
import styles from '../styles/PortfolioItem.module.scss';

const PortfolioItem = (props: IProps): JSX.Element => {
  const getLangStyleClass = (): string => {
    const listOfLangs = Object.keys(styles);
    if (props.data.language.toLowerCase() === 'c++') {
      return 'cpp';
    }
    if (!listOfLangs.includes(props.data.language.toLowerCase())) {
      return 'default';
    }
    return props.data.language.toLowerCase();
  };

  return (
    <div>
      <div>
        <h4>{props.data.name}</h4>
        <ul>
          <li>
            <b>Description:</b> {props.data.description}
          </li>
          <li>
            <b>Stars:</b> <a href={props.data.stargazersUrl}>{props.data.stargazersCount}</a>{' '}
            <FaStar />
          </li>
          <li title="Main language">
            <b>Language:</b>{' '}
            <span className={styles[getLangStyleClass()]}>{props.data.language}</span>
          </li>
          <li>
            <b>Topics:</b> {props.data.topics.reduce((acc, it) => acc + ', ' + it + '')}
          </li>
          <li>
            <b>URL:</b> <a href={props.data.url}>{props.data.url}</a>
          </li>
        </ul>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            title={props.data.name}
            src={`/static/portfolioImages/${props.data.image}`}
            alt={`Image of ${props.data.name}`}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;

interface IProps {
  data: IRepositoryMetadata;
}
