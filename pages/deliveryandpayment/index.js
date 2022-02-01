import React from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import s from './Delivery.module.scss';
import Head from "next/head";
import {Typography} from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Box from "@mui/material/Box";
import PhoneIcon from '@mui/icons-material/Phone';
import Hierarchy from '../../components/HierarchyNew';
import ArticlesBlock from '../../components/ArticlesBlock'
import classNames from "classnames";
import Meta from "../../components/HeadComponent";
import Title from "../../components/Title";

class Delivery extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Meta
                    desc={'Купить напольные покрытий в Тюмени в салоне Мастер Пола можно без QR кода. Заказ оформляется по 100% предоплате. Доставка по городу и России'}
                    title={'Оплата и доставка -  Мастер Пола'}
                />
                <Title title={'Доставка и оплата'}/>
                <Hierarchy hierarchy={[{pathname: '/deliveryandpayment', name: 'Оплата и доставка'}]}/>
                <div className={s.content}>
                    <Box margin={'10px 0 20px'} className={s.padding}>
                        <Typography variant={'subtitle2'}>
                            Заказ оформляется по 100% предоплате
                        </Typography>
                    </Box>

                    <div className={s.card}>
                        <div className={s.headerCard}>
                            <Typography variant={'subtitle2'} className={s.title}>
                                <StoreIcon className={s.icon}/>
                                Забрать в магазине
                            </Typography>
                            <Typography variant={'subtitle2'}> Бесплатно</Typography>
                        </div>
                        <div className={s.headerContent}>
                            <div>
                                Вы можете заказать нужный вам товар, оплатить и указать дату доставки.
                                После получения заказа к нам вы можете забрать товар в салоне по адресу
                                <span className={s.address}> <nobr> ул. Федюнинского 62 к1 </nobr> </span>
                            </div>
                            <div>
                                <Typography variant={'body2'}> Оплата </Typography>
                                <ul className="list">
                                    <li className="list-item">наличные</li>
                                    <li className="list-item">банковской картой</li>
                                    <li className="list-item">выставление счета(для юридических лиц)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={s.card}>
                        <div className={s.headerCard}>
                            <Typography variant={'subtitle2'} className={s.title}>
                                <LocalShippingIcon className={s.icon}/> Доставка по
                                городу </Typography>
                            <Typography variant={'subtitle2'}> 700 ₽</Typography>
                        </div>
                        <div className={s.headerContent}>
                            <div>
                                Вы можете заказать нужный вам товар, оплатить и указать дату и место доставки в черте
                                города.
                                Ваш заказ будет доставлен в указанное вами место и время.
                            </div>
                            <div>
                                <Typography variant={'body2'}> Оплата </Typography>
                                <ul className="list">
                                    <li className="list-item">наличные</li>
                                    <li className="list-item">банковской картой</li>
                                    <li className="list-item">выставление счета(для юридических лиц)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={s.card}>
                        <div className={s.headerCard}>
                            <Typography variant={'subtitle2'} className={s.title}>
                                <LocalShippingIcon className={s.icon}/> Доставка по
                                России </Typography>
                            <Typography variant={'subtitle2'}> Уточняйте у менеджера </Typography>
                        </div>
                        <div className={s.headerContent}>
                            <div>
                                Вы можете заказать нужный вам товар, оплатить и указать дату и место доставки по всей
                                России.
                                Ваш заказ будет доставлен в указанное вами место и время.
                            </div>
                            <div>
                                <Typography variant={'body2'}> Оплата </Typography>
                                <ul className="list">
                                    <li className="list-item">банковской картой</li>
                                    <li className="list-item">выставление счета (для юридических лиц)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={classNames(s.padding, s.footer)}>
                        <Typography variant={'body2'}>
                            Остались вопросы? Звоните!
                        </Typography>
                        <a href={'tel:+79829881522'} className={s.phone}>
                            <PhoneIcon className={s.icon}/> +7 (982) 988-15-22
                        </a>
                    </div>
                    <div className={s.divider}/>
                    <div className={s.padding}>
                        <ArticlesBlock/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Delivery;
