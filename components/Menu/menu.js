import styles from './menu.module.scss';
import cn from 'classnames';
import PlaceIcon from '@mui/icons-material/Place';
import {Tooltip} from '@mui/material';
import BurgerMenu from './Burger';
import {useEffect, useState} from 'react';
import Router, {useRouter} from 'next/router';
import Image from 'next/image'
import InputSearch from "./InputSearch";

const menu = [
    {name: 'Каталог', important: true, link: '/catalog'},
    {name: 'О нас', important: false, link: '/about'},
    //{name: 'Контакты', important: false, link: '/contacts'},
    {name: 'Оплата и доставка', important: false, link: '/delivery'},
    {name: 'Наш блог', important: false, link: '/blog'},
    {name: 'Услуги', important: true, link: '/works'}
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
                            <Image src={'/logo.png'} alt={'logo'} width="64" height="64"/>
                        </div>
                        <div className={styles.name}>
                            <div> МАСТЕР ПОЛА</div>
                        </div>
                    </div>
                    <div className={styles.left}>
                       <InputSearch/>
                        <a href={'tel:+79829881522'} className={styles.phone}>
                            +7 (982) 988-15-22
                        </a>
                        <Tooltip title={'г. Тюмень, ул. Федюнинского д. 62 к. 1'}>
                            <a
                                target={'_blank'}
                                rel='noopener noreferrer'
                                className={styles.address}
                                href={'https://2gis.ru/tyumen/firm/70000001041302673?m=65.569066%2C57.099076%2F16'}
                            >
                                <PlaceIcon className={styles.iconContact}/>
                            </a>
                        </Tooltip>
                    </div>
                    <BurgerMenu toPage={toPage} menu={menu}/>
                </div>
            </div>
            <div className={styles.menuContainer}>
                <div className={cn(styles.menu, {[styles.isHome]: isHome})}>
                    {
                        menu.map(({name, important, link}, index) => (
                            <a
                                key={link}
                                className={cn({
                                    [styles.important]: important,
                                    [styles.isActive]: link === pathname
                                })}
                                href={link}
                            >
                                {name}
                            </a>
                        ))
                    }
                </div>
            </div>
        </header>
    )
}
