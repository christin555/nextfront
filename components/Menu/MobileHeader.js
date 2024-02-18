import styles from './MobileHeader.module.scss';
import React from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import cn from 'classnames';

export default function MobileHeader() {

  return (
    <div className={styles.container}>
      <a
        target={'_blank'}
        rel='noopener noreferrer'
        className={styles.address}
        href={'https://2gis.ru/tyumen/firm/70000001041302673?m=65.569066%2C57.099076%2F16'}
        title='Показать адрес в 2GIS'
      >
        <LocationOnOutlinedIcon className={styles.icon} />
                Тюмень, Мельникайте 138а
      </a>
      <a
        href={'tel:+79829881522'}
        className={styles.phone}
        title='Позвонить'
      >
                8 (982) 988-15-22
      </a>
    </div>
  );
}
