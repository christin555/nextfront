import styles from './Burger.module.scss';
import {Drawer, Divider, IconButton} from '@mui/material';
import cn from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import React, {useState, useEffect} from 'react';
import InputSearch from "./InputSearch";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ViberIcon from "../Icons/ViberIcon";
import VkIcon from "../Icons/VK";

export default function Burger({pathname, menu, toPage, search, setParams, setSearch}) {
    const [state, setState] = useState({isOpen: false});

    useEffect(() => {
        setState(state)
    }, [])

    const setOpen = (isOpen) => {
        setState({isOpen});
    };

    return (
        <>
            <div className={styles.burgerContainer}>
                <IconButton
                    size={'small'}
                    className={styles.burgerIcon}
                    onClick={() => {
                        setOpen(true)
                    }}>
                    <MenuIcon className={styles.burgerIcon}/>
                </IconButton>
                <Drawer
                    anchor={'right'}
                    open={state.isOpen}
                    onClose={
                        () => setOpen(false)
                    }
                >
                    <div className={styles.menu}>
                        <div>
                            <div className={styles.header}>
                                <div className={styles.logo}>
                                    <Image
                                        priority={true}
                                        src={'/logo.png'}
                                        alt={'logo'}
                                        width="24"
                                        height="24"
                                    />
                                </div>
                                <CloseIcon onClick={() => setOpen(false)} className={styles.closeIcon}/>
                            </div>
                            <div className={styles.search}>
                                <InputSearch onClick={() => {
                                    setOpen(false)
                                }}/>
                            </div>
                            <Divider className={styles.divider}/>
                            <ul className={styles.menuLinks}>
                                {
                                    menu.map(({name, Icon, important, link}, index) => (
                                        <li
                                            key={`${link}${index}`}
                                            className={cn({
                                                [styles.important]: important,
                                                [styles.isActive]: link === pathname
                                            })}
                                        >
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
                        </div>
                        <div className={styles.footer}>
                            <div className={styles.messengers}>
                                <a
                                    target={'_blank'}
                                    rel='noopener noreferrer'
                                    href='https://www.instagram.com/masterpola72'
                                    title='Перейти на канал в Instagram'
                                >
                                    <InstagramIcon className={styles.icon}/>
                                </a>
                                <a
                                    target={'_blank'}
                                    rel='noopener noreferrer'
                                    href='https://vk.com/masterpola'
                                    title='Перейти на канал в ВК'
                                > <VkIcon className={styles.icon}/>
                                </a>
                                <a
                                    target={'_blank'}
                                    rel='noopener noreferrer'
                                    href={`https://wa.me/79829881522`}
                                    title='Написать в WhatsApp'
                                >
                                    <WhatsAppIcon className={styles.icon}/>
                                </a>
                                <a
                                    target={'_blank'}
                                    rel='noopener noreferrer'
                                    href={`viber://chat?number=%289829881522`}
                                >
                                    <ViberIcon className={styles.icon}/>
                                </a>
                            </div>
                            <Divider className={styles.divider}/>
                            <a
                                target={'_blank'}
                                rel='noopener noreferrer'
                                href='tel:89829881522'
                                itemProp='telephone'
                                className={styles.phone}
                                title={'Позвонить'}
                            >
                                +7 3452 38-15-22
                            </a>
                            <a
                                target={'_blank'}
                                rel='noopener noreferrer'
                                title={'Посмотреть адрес в 2GIS'}
                                className={styles.infoText}
                                href={'https://2gis.ru/tyumen/firm/70000001041302673?m=65.569066%2C57.099076%2F16'}
                            >
                                Тюмень, ул. Федюнинского 62 к1, 1 этаж
                                (ЖК Ново-Патрушево)
                            </a>
                            <div className={styles.infoText}>
                                ежедневно с 10:00 до 19:00
                            </div>
                        </div>
                    </div>
                </Drawer>
            </div>
        </>
    );
};
