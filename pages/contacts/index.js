import React from 'react';
import s from './Contacts.module.scss';
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import Hierarchy from '../../components/HierarchyNew';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ViberIcon from "../../components/Icons/ViberIcon";
import Meta from "../../components/HeadComponent";
import Title from "../../components/Title";
import VkIcon from "../../components/Icons/VK";

class Delivery extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Meta
                    desc={'Салон напольных покрытий и дверей Мастер Пола находится в Тюмени в ЖК Ново-Патрушева. График работы с 10:00 до 19:00 без выходных и перерывов'}
                    title={'Контакты салона -  Мастер Пола'}
                />
                <Title title={'Контакты'}/>
                <Hierarchy hierarchy={[{pathname: '/contacts', name: 'Контакты'}]}/>
                <div className={s.content}>
                    <Box margin={'10px 0 20px'} className={s.padding}>
                        <Typography variant={'subtitle1'} className={s.name}>
                            Салон напольных покрытий и дверей «Мастер Пола»
                        </Typography>
                    </Box>

                    <div className={s.card}>
                        <div className={s.image}>
                            <iframe src="https://yandex.ru/map-widget/v1/-/CCUyzIeWcD"
                                    height={'600px'}
                                    className={s.iframe}
                                    allowFullScreen="true"
                                    styles="position:relative;">

                            </iframe>
                        </div>
                        <div className={s.cardBody}>
                            <div className={s.field}>
                                <span className={s.titleField}>ТЕЛЕФОН</span>
                                <span className={s.phone}>8 (982) 988-15-22 </span>
                            </div>

                            <div className={s.field}>
                                <span className={s.titleField}>Адрес</span>
                                <span>г. Тюмень, ул. Мельникайте 138а </span>
                            </div>

                            <div className={s.field}>
                                <span className={s.titleField}>Режим работы</span>
                                <span> ежедневно: с 10:00 - 19:00 </span>
                            </div>

                            <div className={s.field}>
                                <span className={s.titleField}>Электронная почта</span>
                                <span> masterpola72@mail.ru </span>
                            </div>
                            <div className={s.field}>
                                <span className={s.titleField}> Мессенджеры </span>
                                <span>
                                    <a
                                        className={s.messenger}
                                        target={'_blank'}
                                        rel='noopener noreferrer'
                                        href={`https://wa.me/79829881522`}
                                        title='Написать в WhatsApp'
                                    >
                                        <WhatsAppIcon className={s.icon}/> WhatsApp
                                    </a>
                                    <a
                                        className={s.messenger}
                                        target={'_blank'}
                                        rel='noopener noreferrer'
                                        href={`viber://chat?number=%289829881522`}
                                    >
                                        <ViberIcon className={s.icon}/> Viber
                                    </a>
                                </span>
                            </div>

                            <div className={s.field}>
                                <span className={s.titleField}> Соцсети </span>
                                <span>
                                    <a
                                        target={'_blank'}
                                        rel='noopener noreferrer'
                                        href='https://www.instagram.com/masterpola72'
                                        title='Перейти на канал в Instagram'
                                        className={s.messenger}
                                    >
                                        <InstagramIcon className={s.icon}/> Instagram
                                    </a>
                                       <a
                                           className={s.messenger}
                                           target={'_blank'}
                                           rel='noopener noreferrer'
                                           href='https://vk.com/masterpola'
                                           title='Перейти на канал в ВК'
                                       > <VkIcon className={s.icon}/>
                                           ВКонтакте
                                       </a>
                                    <a
                                        className={s.messenger}
                                        target={'_blank'}
                                        rel='noopener noreferrer'
                                        href='https://www.youtube.com/channel/UC86lrjiQpHt0Fwzr0FoBxyA'
                                        title='Перейти на канал в YouTube'
                                    >
                                        <YouTubeIcon className={s.icon}/> YouTube
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default Delivery;
