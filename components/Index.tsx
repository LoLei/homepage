import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Obfuscate from 'react-obfuscate';
import styles from '../styles/Index.module.scss';
import { FaFacebook, FaGithub, FaGitlab, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';

const Index = (props: IProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Lorenz Leitner</h1>
      </div>

      <div className={styles.subtitle}>
        <h3>
          <i>Software Developer from Austria</i>
        </h3>
      </div>

      <div className={styles.siteInformation}>
        <p>Here is where you&apos;ll find:</p>
        <ul>
          <li>Contact information</li>
          <li>Links to all my other online presences</li>
          <li>
            <Link href="/about">
              <a>More information about me</a>
            </Link>
          </li>
          <li>
            <Link href="/portfolio">
              <a>My portfolio</a>
            </Link>
          </li>
          <li>
            <Link href="/posts">
              <a>Blog posts</a>
            </Link>
          </li>
        </ul>
      </div>

      <div className={styles.contact}>
        <span>Email:</span>{' '}
        <Obfuscate
          email={props.email}
          headers={{
            subject: 'Contact from Homepage',
          }}
        />
      </div>

      <div className={styles.socials}>
        <p>Socials:</p>
        <div className={styles.socialsLinks}>
          <a href="https://github.com/LoLei">
            <FaGithub />
          </a>
          <a href="https://gitlab.com/LoLei">
            <FaGitlab />
          </a>
          <a href="https://www.linkedin.com/in/lorenzleitner">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/lorenzleitner">
            <FaTwitter />
          </a>
          <a href="https://instagram.com/lorenzleitner">
            <FaInstagram />
          </a>
          <a href="https://facebook.com/lorenzleitner">
            <FaFacebook />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;

interface IProps {
  email: string;
}
