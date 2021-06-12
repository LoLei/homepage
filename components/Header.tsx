import React from 'react';
import HeaderSeparator from '../components/HeaderSeparator';
import HeaderLink from './HeaderLink';

const Header = (): JSX.Element => {
  return (
    <header>
      <HeaderLink routeName="/" displayName="Home" />
      <HeaderSeparator />
      <HeaderLink routeName="/about" displayName="About" />
      <HeaderSeparator />
      <HeaderLink routeName="/posts" displayName="Posts" />
      <HeaderSeparator />
      <HeaderLink routeName="/portfolio" displayName="Portfolio" />
    </header>
  );
};

export default Header;
