import React from 'react';
import s from './Footer.module.scss';
import LogoBlock from './LogoBlock';
import Links from './Links';
import Copy from './CopyBlock';
import Contacts from './Contacts';
import Social from './Social';

const Footer = () => (
<>
    <footer className={s.footer}>
        <LogoBlock />
      <div className={s.content}>
          <Contacts />
          <Links />
          <Social />
      </div>
      <span className={s.policy}>
          ©2019 - 2023, «Мастер Пола»
      </span>
      <Copy />
    </footer>
</>
);

export default Footer;
