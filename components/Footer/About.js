import React from 'react';
import s from './Footer.module.scss';
import Image from 'next/image';

const FooterAbout = () => (
  <div className={s.footerAbout}>
    <div className={s.imgBlock}>
      <Image src={'/magazine.jpg'} layout='fill' />
    </div>
    <div className={s.text}>
      <h4>Купить напольные покрытия в Тюмени</h4>
      <span>
        <p>
          Напольное покрытие – один из ключевых элементов оформления интерьера, принимающий на себя главную нагрузку в помещении.
          Поэтому, выбирая напольные покрытия, следует подходить к приобретению ответственно.
          В магазине представлен каталог напольных покрытий популярных зарубежных и отечественных брендов - Alsafloor, Deart, OptimaPorte, Alpinfloor, Moduleo, Tarkett.
          На сайте можно приобрести материалы, изготовленные на основе натуральной древесины и безопасных полимеров:
          <li>ламинат</li>
          <li>пробковый</li>
          <li>линолеум</li>
          <li>ПВХ-плитку</li>
          <li>ковролин</li>
          <li>спортивное покрытие</li>
          <li>керамогранит</li>
        </p>
      </span>
    </div>
  </div>
);

export default FooterAbout;
