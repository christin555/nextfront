import Menu from './Menu/menu'
import styles from './mainLayout.module.scss';
import cn from 'classnames';
import Footer from './Footer'

export default function mainLayout({router, children}) {
    const isNotHome = router.pathname !== '/';

    return (
        <div className={styles.wrapper}>
            <Menu pathname={router.pathname}/>
            <main className={cn(styles.content, {[styles.isNotHome]: isNotHome})}>
                {children}
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    )
}
