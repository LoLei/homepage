import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/About.module.scss';

const About = (): JSX.Element => {
  const markdown = `
# About Me  

Hi, I’m Lorenz. Here are some facts about me that might be of interest to you:

* **Profession:** Software Engineer
* **Degrees:**
  * MSc (Dipl.Ing. in Austria) in [Software Engineering & Management](https://www.tugraz.at/en/studying-and-teaching/degree-and-certificate-programmes/masters-degree-programmes/software-engineering-and-management/)
  * BSc in [Software Development & Business Management](https://www.tugraz.at/en/studying-and-teaching/degree-and-certificate-programmes/bachelors-degree-programmes/software-engineering-and-management/)  
    From [Graz University of Technology](https://www.tugraz.at/en/home/)
* **Interests:** 
    * Python, C++, many other programming languages
    * Linux, vim, [ricing](https://github.com/LoLei/dotfiles), ...
    * Free and open-source software
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
