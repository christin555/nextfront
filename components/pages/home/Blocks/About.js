import React from 'react';
import s from './Blocks.module.scss';
import Warranty from '../../../Icons/Warranty';
import Reliable from '../../../Icons/Reliable';
import Image from 'next/image'

const About = () => (
  <div className={s.aboutContainer}>
    <h2> Напольные покрытия и двери в Тюмени </h2>
    <div className={s.aboutBock}>
      <div className={s.image}>
        <Image src={'/master.jpg'} layout='fill' priority={true}/>
      </div>
      <div className={s.textAbout}>
        <div className={s.divider} />
        <p>
              Качественное напольное покрытие – то, на что люди обращают внимание в первую очередь, когда заходят в помещение.
          Мы не только поможем вам подобрать лучший вариант напольного покрытия, но и предоставим услуги монтажа.
        </p>
        <p>
              Хочешь сделать что-то хорошо – сделай сам.
              Хочешь идеальные полы – обратись к Мастер Пола!
        </p>
        <div className={s.iconsblock}>
          <div>
            <Warranty className={s.iconAbout} />
            <h3> Лучший материал и качество </h3>
            <span className={s.iconText}>
                       Мы работаем только с самыми лучшими производителями, которые популярны не только в России, но и
                        во всем мире

            </span>
          </div>
          <div>
            <Reliable className={s.iconAbout} />
            <h3> Гарантия на монтаж </h3>
            <span className={s.iconText}>         Наши специалисты имеют многолетний опыт в укладке напольных покрытий и профессионально выполнят
                        весь комплекс работ
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;
