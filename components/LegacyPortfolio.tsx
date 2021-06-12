import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/LegacyPortfolio.module.scss';

const LegacyPortfolio = (): JSX.Element => {
  // TODO: Pull this in from https://raw.githubusercontent.com/LoLei/portfolio/master/README.md
  const markdown = `
# Portfolio
Selected projects on which I've worked

## Personal Projects
- [homepage](https://github.com/LoLei/lolei.github.io) - Personal website
- [razer-cli](https://github.com/LoLei/razer-cli) - Command line interface for Razer devices
- [gryibwc](https://github.com/LoLei/gryibwc) - Goodreads yearly word count stats
- [tug-overlap-checker](https://github.com/LoLei/tug-overlap-checker) - Class times overlap checker
- [toc-web](https://github.com/LoLei/toc-web) - Web version of the above
- [authorfix](https://github.com/LoLei/authorfix) - Fixing LaTeX BibTex citations
- [redditcleaner](https://github.com/LoLei/redditcleaner) - Cleans Reddit text data
- [spmf-py](https://github.com/LoLei/spmf-py) - Python wrapper for the SPMF data mining library
- [ircbot](https://github.com/LoLei/ircbot) - Comprehensive IRC bot
- [dibo](https://github.com/LoLei/dibo) - Minimal Discord bot
- [pycolorpicker](https://github.com/LoLei/pycolorpicker) - Simple command line color picker
- [copypasta-search](https://github.com/LoLei/copypasta-search) - Retrieve copypasta on Reddit with Python
- [dotfiles](https://github.com/LoLei/dotfiles) - Linux configuration files, many convenience scripts
- [hl2-counter](https://github.com/LoLei/hl2-counter) - Days passed since Half Life 2 was released
- [got-counter](https://github.com/LoLei/got-counter) - Same for last "A Song of Ice and Fire" book

## School Projects
- [Birb](https://tulsd.itch.io/birb) - 3D single-player bird flying game
- [Vandalizing chevalieR](https://tulsd.itch.io/gdd2) - 3D asymmetrical VR multiplayer game
- [XP Android app](https://github.com/LoLei/sw-ss16) - Android app developed using Extreme Programing practices
- [Yet Another Content Auditor](https://github.com/LoLei/YACA) - Content audit generator
- [Yet Another Site Mapper](https://github.com/LoLei/YASM) - Site map generator
- [Design Patterns Examples](https://github.com/LoLei/design-patterns-examples) - Implementations of design patterns in different languages
- [Kurve](https://github.com/tulsd/kurve) - Curve Fever browser multiplayer game

## Open-Source Contributions
- [lmrdashboard](https://github.com/r-lmr/lmrdashboard) - Live IRC channel information
- [pywal](https://github.com/dylanaraps/pywal) - Color scheme generator/changer
- [rtv](https://github.com/michael-lazar/rtv) - Reddit terminal viewer
- [Hacktoberfest 2019/20](https://hacktoberfest.digitalocean.com)
- Several others - check forks on my [GitHub profile](https://github.com/LoLei)

## Fancy List
- [Gitfolio](https://lolei.github.io/portfolio/gitfolio/)
`;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default LegacyPortfolio;
