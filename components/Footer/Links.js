import React from 'react';
import s from './Footer.module.scss';
import Link from 'next/link';

const Footer = () => {
  const itemsMenu = [
    {
      name: 'Каталог',
      alias: '/catalog'
    },
    {
      name: 'Услуги',
      alias: '/services'
    },
    {
      name: 'Оплата и доставка',
      alias: '/deliveryandpayment'
    },
    {
      name: 'О нас',
      alias: '/about'
    },
    {
      name: 'Наши работы',
      alias: '/articles'
    },
    {
      name: 'Блог',
      alias: '/works'
    },
    {
      name: 'Контакты',
      alias: '/contacts'
    }
  ];

  const itemsCatalog = [
    {
      name: 'Ламинат',
      alias: '/catalog/laminate'
    },
    {
      name: 'Керамогранит',
      alias: '/catalog/keramogranit'
    },
    {
      name: 'Кварцвиниловая плитка',
      alias: '/catalog/quartzvinyl'
    },
    {
      name: 'Спортивное покрытие',
      alias: '/catalog/sport'
    },
    {
      name: 'Двери',
      alias: '/catalog/doors'
    }
  ];

  return (
    <div className={s.links}>
      <div>
        <span className={s.categoryName}> Каталог </span>
        {
          itemsCatalog.map(({name, alias}) =>
            <Link href={alias} key={alias}>{name}</Link>)
        }
      </div>
      <div>
        <span className={s.categoryName}> Меню </span>
        {
          itemsMenu.map(({name, alias}) =>
            <Link href={alias} key={alias}>{name}</Link>)
        }
      </div>
    </div>
  );
};

export default Footer;
