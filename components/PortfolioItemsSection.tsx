import React from 'react';
import { IRepositoryMetadata } from '../util/git/AbstractGitService';
import PortfolioItem from './PortfolioItem';

const PortfolioItemsSection = (props: IProps): JSX.Element => {
  return (
    <>
      <div className={props.className}>
        <h3>{props.title}</h3>
        {props.intro}
        {props.portfolioData.map((it, idx) => {
          return <PortfolioItem key={idx} data={it}></PortfolioItem>;
        })}
      </div>
    </>
  );
};

export default PortfolioItemsSection;

interface IProps {
  portfolioData: IRepositoryMetadata[];
  title: string;
  intro: string;
  className: string;
}
