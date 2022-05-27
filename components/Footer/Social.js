import React from 'react';
import s from './Footer.module.scss';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ViberIcon from '../../components/Icons/ViberIcon';
import VkIcon from '../../components/Icons/VK';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Box from "@mui/material/Box";
import YouTubeIcon from "@mui/icons-material/YouTube";


const Contacts = () => (
    <div className={s.social}>
        <Box
            marginBottom={'40px'}
            color={'white'}
            gap={'5px'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-start'}
        >
          <span>
               г. Тюмень, ул. Мельникайте 138а
          </span>
            <span>
                ежедневно с 10:00 - 19:00
            </span>
        </Box>
        <p> Мы в соцсетях </p>
        <div className={s.messangers}>
            <a
                className={s.messenger}
                target={'_blank'}
                rel='noopener noreferrer'
                href='https://www.instagram.com/masterpola72'
                title='Перейти на канал в Instagram'
            >
                <InstagramIcon className={s.icon}/>
            </a>
            <a
                className={s.messenger}
                target={'_blank'}
                rel='noopener noreferrer'
                href='https://vk.com/masterpola'
                title='Перейти в сообщество ВКонтакте'
            >
                <VkIcon className={s.icon}/>
            </a>
            <a
                className={s.messenger}
                target={'_blank'}
                rel='noopener noreferrer'
                href='https://www.youtube.com/channel/UC86lrjiQpHt0Fwzr0FoBxyA'
                title='Перейти на канал в YouTube'
            >
                <YouTubeIcon className={s.icon}/>
            </a>
            <a
                className={s.messenger}
                target={'_blank'}
                rel='noopener noreferrer'
                href={`https://wa.me/79829881522`}
                title='Написать в WhatsApp'
            >
                <WhatsAppIcon className={s.icon}/>
            </a>
            <a
                className={s.messenger}
                target={'_blank'}
                rel='noopener noreferrer'
                href={`viber://chat?number=%289829881522`}
            >
                <ViberIcon className={s.icon}/>
            </a>
            <a
                className={s.messenger}
                target={'_blank'}
                rel='noopener noreferrer'
                href={`mailto:masterpola72@mail.ru`}
            >
                <MailOutlineIcon className={s.icon}/>
            </a>
        </div>
    </div>
);

export default Contacts;
