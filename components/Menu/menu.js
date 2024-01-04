import styles from './menu.module.scss';
import cn from 'classnames';
import BurgerMenu from './Burger';
import React, {useEffect, useState} from 'react';
import Router, {useRouter} from 'next/router';
import InputSearch from './InputSearchMenu';
import Callme from '../Callme';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import NearMeIcon from '@mui/icons-material/NearMe';
import InstagramIcon from '@mui/icons-material/Instagram';
import ViberIcon from '../Icons/ViberIcon';
import MobileHeader from './MobileHeader';
import VkIcon from '../Icons/VK';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Garland from './Cristmas';
import g from './lightrope.module.scss';

const menu = [
  {name: 'Каталог', important: true, link: '/catalog'},
  {name: 'Мастер блог', important: false, link: '/blog'},
  //{name: 'О компании', important: false, link: '/about'},
  {name: 'Оплата и доставка', important: false, link: '/deliveryandpayment'},
  {name: 'Услуги', important: true, link: '/services'},
  {name: 'Наши работы', important: true, link: '/works'},
  {name: 'Контакты', important: true, link: '/contacts'},
  {name: 'Отзывы', important: true, link: '/reviews'}
];

export default function Menu() {
  const router = useRouter();
  const pathname = router?.pathname;
  const toPage = (pathname) => Router.push(pathname);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScrollPos = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScrollPos, {passive: true});

    return () => {
      window.removeEventListener('scroll', handleScrollPos);
    };
  });

  return (
    <React.Fragment>
      <header className={styles.container}>
        <div className={styles.header}>
          <MobileHeader/>
          <Garland/>
          {/*<div className={styles.headerBackground}/>*/}
          <div className={styles.headerContent}>
            <div className={styles.logoBlock}>
              <div
                className={styles.logo}
                onClick={() => toPage('/')}
              >
                <img
                  className={styles.logo}
                  src={'/logo.png'}
                  alt={'logo'}
                  width="64"
                  height="64"
                />
              </div>
              <div className={styles.name} onClick={() => toPage('/')}>
                Мастер Пола
              </div>
              <a
                target={'_blank'}
                rel="noopener noreferrer"
                className={styles.address}
                href={'https://2gis.ru/tyumen/firm/70000001041302673?m=65.569066%2C57.099076%2F16'}
                title="Показать адрес в 2GIS"
              >
                <NearMeIcon className={styles.icon}/>
                Тюмень, Мельникайте 138а
              </a>
            </div>
            <div className={styles.left}>
              <div className={styles.phoneBlock}>
                <a
                  href={'tel:+79829881522'}
                  className={styles.phone}
                  title="Позвонить"
                >
                  8 982 988-15-22
                </a>
                <Callme ButtonCall={(
                  <span className={styles.callme}>
                                    перезвоните нам
                  </span>
                )}
                />
              </div>
            </div>
            <BurgerMenu toPage={toPage} menu={menu}/>
          </div>
        </div>
      </header>
      <nav className={styles.menuContainer}>
        <ul className={styles.menu}>
          <li><InputSearch/></li>
          {
            menu.map(({name, link, Icon}, index) => (
              <li key={link} className={cn({[styles.isActive]: link === pathname})}>
                <a
                  href={link}
                  title={name}
                >
                  {Icon ? <Icon className={styles.icon}/> : null} {name}
                </a>
              </li>
            ))
          }
        </ul>
        <ul className={cn(styles.menu, styles.grayMenu)}>
          <li>
            <a
              target={'_blank'}
              rel="noopener noreferrer"
              href={`https://wa.me/79829881522`}
              title="Написать в WhatsApp"
            >
              <WhatsAppIcon className={styles.icon}/>
            </a>
          </li>
          <li>
            <a
              target={'_blank'}
              rel="noopener noreferrer"
              href="https://www.instagram.com/masterpola72"
              title="Перейти на канал в Instagram"
            >
              <InstagramIcon className={styles.icon}/>
            </a>
          </li>
          <li>
            <a
              target={'_blank'}
              rel="noopener noreferrer"
              href={`viber://chat?number=%289829881522`}
            >
              <ViberIcon className={styles.icon}/>
            </a>
          </li>
          <li>
            <a
              target={'_blank'}
              rel="noopener noreferrer"
              href="https://vk.com/masterpola"
              title="Перейти в сообщество ВКонтакте"
            >
              <VkIcon className={styles.icon}/>
            </a>
          </li>
          <li>
            <a
              target={'_blank'}
              rel="noopener noreferrer"
              href="https://www.youtube.com/channel/UC86lrjiQpHt0Fwzr0FoBxyA"
              title="Перейти на канал в YouTube"
            >
              <YouTubeIcon className={styles.icon}/>
            </a>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
}
