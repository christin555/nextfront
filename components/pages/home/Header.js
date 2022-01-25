import React from 'react';
import s from './home.module.scss';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const Header = () => (
  <div className={s.wrapper}>
    <div className={s.shadow} />
    <div className={s.overlay}>
      <div className={s.txtblocks}>
        <div>
            <h1 className={s.name}>
                Хочешь сделать что-то хорошо – сделай сам.<br/>Хочешь идеальные полы – обратись к Мастер Пола!
            </h1>
            <h2 className={s.slogan}>
                Салон напольных покрытий и дверей
            </h2>
        </div>
        <div className={s.subs}>
          <a
            target={'_blank'}
            rel='noopener noreferrer'
            href='https://www.instagram.com/masterpola72'
            title='Перейти на канал в Instagram'
          >
            <InstagramIcon className={s.icon} />
                  instagram
          </a>
          <a
            target={'_blank'}
            rel='noopener noreferrer'
            href='https://www.youtube.com/channel/UC86lrjiQpHt0Fwzr0FoBxyA'
            title='Перейти на канал в YouTube'
          >  <YouTubeIcon className={s.icon} />
                  youtube
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
