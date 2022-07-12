import Menu from './Menu'
import styles from './mainLayout.module.scss';
import Footer from './Footer'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {IconButton} from "@mui/material";

export default function mainLayout({router, children}) {
    return (
        <div className={styles.wrapper}>
            <Menu pathname={router.pathname}/>
            <main className={styles.content}>
                {children}
                <IconButton size={'medium'} className={styles.upButton} onClick={() => window.scrollTo(0, 0)}>
                    <ArrowUpwardIcon className={styles.upIcon} />
                </IconButton>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}
