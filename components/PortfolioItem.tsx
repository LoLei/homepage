import React from 'react';
import { IRepositoryMetadata } from '../util/git/AbstractGitService';
import { FaStar } from 'react-icons/fa';

const PortfolioItem = (props: IProps): JSX.Element => {
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
            <b>Language:</b> {props.data.language}
          </li>
          <li>
            <b>Topics:</b> {props.data.topics.reduce((acc, it) => acc + ', ' + it + '')}
          </li>
          <li>
            <b>URL:</b> <a href={props.data.url}>{props.data.url}</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PortfolioItem;

interface IProps {
  data: IRepositoryMetadata;
}
