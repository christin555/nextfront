import Menu from './Menu'
import styles from './mainLayout.module.scss';
import cn from 'classnames';
import Footer from './Footer'
import {inject, observer} from "mobx-react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {IconButton} from "@mui/material";

export default function mainLayout({router, children}) {
    const isNotHome = router.pathname !== '/';

    return (
        <div className={styles.wrapper}>
            <Menu pathname={router.pathname}/>
            <main className={cn(styles.content, {[styles.isNotHome]: isNotHome})}>
                {children}
                <IconButton size={'large'} className={styles.upButton} onClick={() => window.scrollTo(0, 0)}>
                    <ArrowUpwardIcon className={styles.upIcon} />
                </IconButton>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}
