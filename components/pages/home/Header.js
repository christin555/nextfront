import React from 'react';
import s from './home.module.scss';
import VkIcon from '../../Icons/VK';
import InstagramIcon from '@mui/icons-material/Instagram';

const Header = () => (
    <div className={s.wrapper}>
        <div className={s.videoContainer}>
            <video className={s.video} src={'service.mp4'} autoPlay={true} muted={true} loop={true} playsInline={true}/>
        </div>
        <div className={s.overlay}>
            <div className={s.txtblocks}>
                <div>
                    <h1 className={s.name}>
                        Хочешь сделать что-то хорошо – сделай сам.<br/>Хочешь идеальные полы – обратись к Мастер Пола!
                    </h1>
                    <h2 className={s.slogan}>
                        Салон напольных покрытий и дверей
                    </h2>
                </div>
                <div className={s.subs}>
                    <a
                        target={'_blank'}
                        rel='noopener noreferrer'
                        href='https://www.instagram.com/masterpola72'
                        title='Перейти на канал в Instagram'
                    >
                        <InstagramIcon className={s.icon}/>
                        instagram
                    </a>
                    <a
                        target={'_blank'}
                        rel='noopener noreferrer'
                        href='https://vk.com/masterpola'
                        title='Перейти на канал в ВК'
                    > <VkIcon className={s.icon}/>
                        ВКонтакте
                    </a>
                </div>
            </div>
        </div>
    </div>
);

export default Header;
