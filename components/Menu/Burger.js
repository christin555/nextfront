import styles from './Burger.module.scss';
import {Drawer, Divider, IconButton} from '@mui/material';
import cn from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import React, {useState, useEffect} from 'react';
import InputSearch from "./InputSearch";

export default function Burger({pathname, menu, toPage, search, setParams, setSearch}) {
    const [state, setState] = useState({isOpen: false});

    useEffect(() => {
        setState(state)
    }, [])

    const setOpen = (isOpen) => {
        setState({isOpen});
    };

    const toPageWithClose = (link) => {
        setOpen(false);
        toPage(link);
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
                                <div> Меню</div>
                                <CloseIcon onClick={() => setOpen(false)}/>
                            </div>
                            <div className={styles.search}>
                                <InputSearch onClick={() => {
                                    setOpen(false)
                                }}/>
                            </div>
                            {
                                menu.map(({name, important, link}, index) => (
                                    <div
                                        key={`${link}${index}`}
                                        className={cn({
                                            [styles.important]: important,
                                            [styles.isActive]: link === pathname
                                        })}
                                        onClick={() => toPageWithClose(link)}
                                    >
                                        {name}
                                    </div>
                                ))
                            }
                        </div>
                        <div className={styles.footer}>
                            <Divider className={styles.divider}/>
                            <a
                                target={'_blank'}
                                rel='noopener noreferrer'
                                href='tel:89829881522'
                                itemProp='telephone'
                                className={styles.phone}
                            >
                                +7 3452 38-15-22
                            </a>
                            <a
                                target={'_blank'}
                                rel='noopener noreferrer'
                                className={styles.infoText}
                                href={'https://2gistyles.ru/tyumen/firm/70000001041302673?m=65.569066%2C57.099076%2F16'}
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
