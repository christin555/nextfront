import styles from './menu.module.scss';
import cn from 'classnames';
import {Tooltip} from '@mui/material';
import BurgerMenu from './Burger';
import React, {useEffect, useState} from 'react';
import Router, {useRouter} from 'next/router';
import Image from 'next/image'
import InputSearch from "./InputSearch";
import Callme from "../Callme";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AppsIcon from '@mui/icons-material/Apps';
import NearMeIcon from '@mui/icons-material/NearMe';
import InstagramIcon from "@mui/icons-material/Instagram";
import ViberIcon from "../Icons/ViberIcon";
import Box from "@mui/material/Box";

const menu = [
    {name: 'Каталог', important: true, link: '/catalog', Icon: AppsIcon},
    {name: 'О компании', important: false, link: '/about'},
    {name: 'Оплата и доставка', important: false, link: '/deliveryandpayment'},
    {name: 'Наш блог', important: false, link: '/blog'},
    {name: 'Услуги', important: true, link: '/services'},
    {name: 'Наши работы', important: true, link: '/works'},
    {name: 'Контакты', important: true, link: '/contacts'}
]

export default function Menu() {
    const router = useRouter();
    const pathname = router?.pathname;
    const isHome = pathname === '/';
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

        window.addEventListener('scroll', handleScrollPos);

        return () => {
            window.removeEventListener('scroll', handleScrollPos);
        };
    });

    const onKeyPressHandler = (event) => {
        if (event.charCode === 13) {
        }
    }

    return (
        <header className={styles.container}>
            <div className={cn(styles.header, {[styles.isScrolled]: isScrolled, [styles.isHome]: isHome})}>
                <div className={styles.headerBackground}/>
                <div className={styles.headerContent}>
                    <div
                        className={styles.logoBlock}
                        onClick={() => toPage('/')}
                    >
                        <div className={styles.logo}>
                            <Image
                                priority={true}
                                src={'/logo.png'}
                                alt={'logo'}
                                width="64"
                                height="64"
                            />
                        </div>
                        <div className={styles.name}>
                            <div> МАСТЕР ПОЛА</div>
                        </div>
                        <a
                            target={'_blank'}
                            rel='noopener noreferrer'
                            className={styles.address}
                            href={'https://2gis.ru/tyumen/firm/70000001041302673?m=65.569066%2C57.099076%2F16'}
                            title='Показать адрес в 2GIS'
                        >
                            <NearMeIcon className={styles.icon}/>
                            Тюмень, Федюнинского 62 к1
                        </a>
                        <Box margin={'0 20px'} display={'flex'}>
                            <a
                                className={styles.messenger}
                                target={'_blank'}
                                rel='noopener noreferrer'
                                href={`https://wa.me/79829881522`}
                                title='Написать в WhatsApp'
                            >
                                <WhatsAppIcon className={styles.icon} />
                            </a>
                            <a
                                className={styles.messenger}
                                target={'_blank'}
                                rel='noopener noreferrer'
                                href='https://www.instagram.com/masterpola72'
                                title='Перейти на канал в Instagram'
                            >
                                <InstagramIcon className={styles.icon}  />
                            </a>
                            <a
                                className={styles.messenger}
                                target={'_blank'}
                                rel='noopener noreferrer'
                                href={`viber://chat?number=%289829881522`}
                            >
                                <ViberIcon className={styles.icon}  />
                            </a>
                        </Box>
                    </div>
                    <div className={styles.left}>
                        <div className={styles.phoneBlock}>
                            <a
                                href={'tel:+79829881522'}
                                className={styles.phone}
                                title='Позвонить'
                            >
                                8 (982) 988-15-22
                            </a>
                            <Callme ButtonCall={
                                <span className={styles.callme}>
                                    Заказать звонок
                                </span>
                            }/>
                        </div>
                    </div>
                    <BurgerMenu toPage={toPage} menu={menu}/>
                </div>
            </div>
            <div className={styles.menuContainer}>
                <nav className={cn(styles.menu, {[styles.isHome]: isHome})}>
                    {
                        menu.map(({name, link, Icon}, index) => (
                            <a
                                key={link}
                                className={cn({[styles.isActive]: link === pathname})}
                                href={link}
                                title={name}
                            >
                                {Icon ? <Icon className={styles.icon}/>: null} {name}
                            </a>
                        ))
                    }
                    <InputSearch className={styles.headerSearch}/>
                </nav>
            </div>
        </header>
    )
}
