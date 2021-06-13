import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/HeaderLink.module.scss';

const HeaderLink = (props: IProps): JSX.Element => {
  const router = useRouter();

  /**
   * Returns true for subroutes, handles '/' separately
   */
  const shouldBeActive = (): boolean => {
    return (
      (router.route.startsWith(props.routeName) && props.routeName.length !== 1) || props.routeName === router.route
    );
  };

  return (
    <span className={styles.container}>
      <Link href={props.routeName}>
        <a className={shouldBeActive() ? styles.active : ''}>{props.displayName}</a>
      </Link>
    </span>
  );
};

interface IProps {
  routeName: string;
  displayName: string;
}

export default HeaderLink;
