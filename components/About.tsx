import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/About.module.scss';

const About = (): JSX.Element => {
  const markdown = `
# About Me  

Hi, I’m Lorenz. Here are some facts about me that might be of interest to you:

* **Profession:** Software Engineer
* **Degrees:**
  * MSc (Dipl.Ing. for my fellow Austrians)
  * BSc  
  In Software Engineering & Management and Software Development & Business Management, respectively, from Graz University of Technology
* **Interests:** Python, C++, many other programming languages, Linux, vim, free and open-source software
* **Portfolio:** [lolei.github.io/portfolio](https://lolei.github.io/portfolio)
* **How to reach me:** See the [front page](https://lolei.github.io) for either my email address or my socials

`;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default About;
