import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/HeaderLink.module.scss';

const HeaderLink = (props: IProps): JSX.Element => {
  const router = useRouter();

  return (
    <Link href={props.routeName}>
      <a className={router.route === props.routeName ? styles.active : ''}>{props.displayName}</a>
    </Link>
  );
};

interface IProps {
  routeName: string;
  displayName: string;
}

export default HeaderLink;
