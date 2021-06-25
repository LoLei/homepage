import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Obfuscate from 'react-obfuscate';
import styles from '../styles/Index.module.scss';
import { FaFacebook, FaGithub, FaGitlab, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Index = (props: IProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Lorenz Leitner</h1>
      </div>

      <div className={styles.subtitle}>
        <h2>
          <i>Welcome to my homepage</i>
        </h2>
      </div>

      <div className={styles.siteInformation}>
        <p>Here is where you&apos;ll find:</p>
        <ul>
          <li>Contact information</li>
          <li>Links to all my other online presences</li>
          <li>More information about me</li>
          <li>My portfolio</li>
          <li>Blog posts</li>
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
