import React from 'react';
import s from './Footer.module.scss';
import LogoBlock from './LogoBlock';
import Links from './Links';
import DefaultStyle from '../../styles/theme/DefaultStyle';
import Copy from './CopyBlock';
import Contacts from './Contacts';
import FooterAbout from './About';
import Social from './Social';

const Footer = () => (
<>
    <FooterAbout />
    <footer className={s.footer}>
        <LogoBlock />
      <div className={s.content}>
          <Contacts />
          <Links />
          <Social />
      </div>
      <span className={s.policy}>©2019 - 2022, «Мастер Пола» </span>
      <Copy />
    </footer>
</>
);

export default Footer;
