import React from 'react';
import s from './About.module.scss';
import YouTube from 'react-youtube';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Image from 'next/image';
import Head from "next/head";
import Title from "../../components/Title";

const About = () => (
  <React.Fragment>
      <Head>
          <title>   О нас | Мастер Пола</title>
      </Head>
      <Title title={'О нас'}/>
    <div className={s.header}>
        <div className={s.preview}>
          <div className={s.text}>
            <p> <b>Мастер Пола</b>  – салон напольных покрытий и дверей, осуществляющий как продажу, так и монтаж напольных покрытий.</p>
            <p>
                Компания с уверенностью гарантирует, что высокое качество приобретенного товара будет радовать вас долгие годы.
                «Мастер Пола» работает только с лучшими производителями, которые популярны не только в России, но и во всем мире.
                В сфере ремонтно-монтажных работ компания давно зарекомендовала себя как ответственный и надежный исполнитель.
            </p>
            <span>
              <div className={s.chars}>
                <div><DoneOutlineIcon className={s.icon} /> Гарантия на выполненные работы</div>
                <div> <DoneOutlineIcon className={s.icon} /> Материал премиум класса   </div>
                <div> <DoneOutlineIcon className={s.icon} /> Наши специалисты работают на рынке ремонтных работ уже более 10 лет   </div>
                <div> <DoneOutlineIcon className={s.icon} /> Все работы выполняются точно в срок  </div>
              </div>

            </span>
          </div>
        </div>
      <YouTube
        opts={{
          width: '650',
          height: '100%'
        }}
        videoId={'bAmdyypn8OI'}
      />
    </div>
    <div className={s.content}>
      <div className={s.mediaBlock}>
        <Image
            placeholder={'blur'}
            blurDataURL="/blur.png"
            src={'/about.jpg'} layout='fill'
            alt={'О компании'}/>
      </div>
      <div className={s.text}>
        <h2> Профессионализм </h2>
                Наши специалисты готовы выполнить работы любой сложности. Хочешь сделать что-то хорошо – сделай сам. Хочешь идеальные полы – обратись к Мастер Пола!
        <ul>
        </ul>
        <h2> Ответственность </h2>
        <p> Все работы выполняются точно в срок.
            Каждый Клиент для нас очень важен, мы всегда поможем выбрать, купить и сделать демонтаж/монтаж
                    напольных покрытий! Обращаясь к нам Вы останетесь довольны на 100%! Качество работы наших
                    профессионалов всегда на высоте!
        </p>
        <h2> Надежность </h2>
                Наши специалисты работают на рынке ремонтных работ уже более 10 лет.
        <br />В нашем штате исключительно опытные и квалифицированные мастера.
      </div>
    </div>
  </React.Fragment>
);

export default About;
