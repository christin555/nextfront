import React from 'react';
import s from './Footer.module.scss';
import Image from 'next/image';

const LogoBlock = () => (
  <div className={s.logoBlock}>
    <div className={s.logo}>
      <Image src={'/logo.png'} layout='fill'/>
    </div>
    <div className={s.nameLogo}>
      <div className={s.name}>МАСТЕР ПОЛА</div>
      <div>салон напольных покрытий и дверей</div>
    </div>
  </div>

);

export default LogoBlock;
