import styles from './Burger.module.scss';
import {Drawer, Divider, IconButton} from '@mui/material';
import cn from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '../TextField';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {useState, useEffect} from 'react';

export default function Burger({pathname, menu, toPage, search, setParams, setSearch}) {
  const [state, setState] = useState({isOpen: false});

  useEffect(() => { setState(state) }, [])

  const setOpen = (isOpen) => {
    alert()
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
          onClick={() => {setOpen(true)}}>
        <MenuIcon  className={styles.burgerIcon} />
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
              <CloseIcon onClick={() => setOpen(false)} />
            </div>
            <Divider className={styles.divider} />
            <div className={styles.search}>
              <TextField
                placeholder={'Поиск'}
                value={search}
                onChange={setSearch}
              />
              <SearchIcon onClick={setParams} />
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
            <div className={styles.infoText}>
              <AccessTimeIcon className={styles.icon} />
              ежедневно с 10:00 до 19:00
            </div>
            <div className={styles.infoText}>
              <PhoneIcon className={styles.icon} />
                +7 (982) 988-15-22
            </div>
            <a
              target={'_blank'}
              rel='noopener noreferrer'
              className={styles.infoText}
              href={'https://2gistyles.ru/tyumen/firm/70000001041302673?m=65.569066%2C57.099076%2F16'}
            >
              <PlaceIcon className={styles.icon} />
                Тюмень, ул. Федюнинского д. 62 к. 1
            </a>
          </div>

        </div>
      </Drawer >
    </div>
      </>
  );
};
