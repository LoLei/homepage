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
            Stars: {props.data.stargazersCount} <FaStar />
          </li>
          <li title="Main language">Language: {props.data.language}</li>
        </ul>
      </div>
    </div>
  );
};

export default PortfolioItem;

interface IProps {
  data: IRepositoryMetadata;
}
