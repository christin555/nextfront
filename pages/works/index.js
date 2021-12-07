import React from 'react';
import Carousel from '../../components/Carousel';
import 'react-image-gallery/styles/css/image-gallery.css';
import s from './Works.module.scss';
import Callme from '../../components/Callme';

class Works extends React.Component {
  get images() {
    return [
      'https://sun3-8.userapi.com/impg/xQ-Dm6Q7LfQH8XaTl3PK59i2Dyeqhfdl0CmO1A/MOj9TwG7Nwo.jpg?size=640x640&quality=96&sign=6ab3ae1062a598839f27de8094c1ee4c&type=album',
      'https://sun9-63.userapi.com/impg/Jk1dEvTJNV3JJiBNft6a4Q6ZlC8Ue_52hJcKRQ/HyaCxaJHwSE.jpg?size=640x640&quality=96&sign=e9b95b48d0ac612eacf23457516667a6&type=album',
      'https://sun9-21.userapi.com/impg/kzQAeMjH9dcgCJ2HtnT7jV0mzL3a8RjeJ0cM6A/I6_q_9sz1_g.jpg?size=1280x853&quality=96&sign=7aa678adf04a7da544d42d62cedce7cd&type=album',
      'https://sun9-73.userapi.com/impg/fFSS9w_mnsk99SIvq5xevNgMNnuLgc7lJdyZKA/8MOGMU-XNGo.jpg?size=853x1280&quality=96&sign=ec82af87b54fcdfcd34a7d1b715a45cd&type=album',
      'https://sun9-85.userapi.com/impg/n34elxu4lKo_qe4-FlLcm69RH0hXqeE11yhBhw/xYrpS3BB5XU.jpg?size=1280x853&quality=96&sign=24a7093b8df67fc22c65a4b4db838708&type=album'
    ].map((img) => {
      return {src: img};
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className={s.header}>
          {'Услуги'}
          <div className={s.line} />
        </div>
        <div className={s.content}>
          <div className={s.preview}>
            <div className={s.carousel}>
              <Carousel
                  imgs={this.images}
              />
            </div>
            <div className={s.text}>
              <div className={s.title}>
                                Команда, которой можно доверить ремонт
              </div>
              <p>
                    Команда, которой можно доверить ремонт
                    «Мастер Пола» работает в г. Тюмень , поставляя ремонтные и строительный материалы, а
                    также
                    инструменты и оборудование с 2019 года. Неважно, хотите ли вы отремонтировать ваш дом,
                    построить новый с нуля или вам нужны только небольшие косметические работы, - мы сможем
                    помочь вам. Мы стараемся обеспечить клиентов понятными мануалами, качественными
                    материалами,
                    а также всегда готовы оказать профессиональную поддержку в процессе работы.
              </p>
              <p>
                    Мы предлагаем
                    широкий спектр оборудования и аксессуаров, способных удовлетворить все запросы.
                    Наши клиенты и профессиональные строители, и частные лица доверяют нам и полагаются на
                    наши
                    товары и услуги. Специалисты, которые работают у нас, обладают высокой профессиональной
                    компетенцией и всегда готовы помочь советом и делом.
              </p>
              <ul>
                <li>Подготовка основания</li>
                <li>Финишное выравнивание основания</li>
                <li>Укладка ламината</li>
                <li> {'Монтаж паркетной доски "плавающим способом" и с приклеиванием'}</li>
                <li> Монтаж ПВХ/LVT/кварцвиниловой плитки</li>
                <li> Монтаж настенной и напольной пробки</li>
                <li> Укладка массивной/инженерной доски</li>
                <li> Укладка керамогранита и керамической плитки</li>
                <li> Устройство спортивных покрытий</li>
                <li> Монтаж коврового покрытия</li>
                <li> Обустройство лестниц ковролином</li>
                <li>Укладка коммерческих напольных покрытий</li>
                <li> Демонтаж/монтаж напольного покрытия/стяжки</li>
                <li> Нанесение декоративной штукатурки</li>
                <li> Изготовление художественных композиций из ковролина, кварцвиниловой плитки и рулонных
                        ПВХ-покрытий
                </li>
              </ul>
              <p> Свяжитесь с нами и узнайте, чем мы сможем быть полезными.
              </p>
              <Callme buttonText={'Рассчитайте стоимость монтажа в вашем доме'} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Works;
