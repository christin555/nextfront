import React from 'react';
import s from './Footer.module.scss';
import Callme from '../Callme';
import Box from "@mui/material/Box";

const Contacts = () => (
    <div className={s.contactsContainer}>
        <a
            target={'_blank'}
            rel='noopener noreferrer'
            href='tel:89829881522'
            itemProp='telephone'
            className={s.phone}
        >
            8 (982) 988-15-22
        </a>
        <p>
            Задать вопрос, оформить покупку или заказать расчет
        </p>
        <Callme className={s.button} buttonText={'ЗАКАЗАТЬ ЗВОНОК'}/>
    </div>

);

export default Contacts;
