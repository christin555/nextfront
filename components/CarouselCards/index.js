import React, {Component} from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Cards/Card';
import s from './styles.module.scss';
import TitleBlock from '../TitleBlock';
import classNames from 'classnames';

class CardsView extends Component {
    responsive = {
      desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 5,
        slidesToSlide: 1 // optional, default to 1.
      },
      tablet: {
        breakpoint: {max: 1024, min: 650},
        items: 3,
        slidesToSlide: 1 // optional, default to 1.
      },
      mobile: {
        breakpoint: {max: 650, min: 0},
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
      }
    };

    render() {
      const {products, deviceType, title, className} = this.props;

      const Cards = products.map((item, index) => (
        <Card
          withCategory={true}
          key={index}
          {...item}
        />
      ));

      return (
        <div className={classNames(s.container, className)}>
          <TitleBlock title={title} />
          <div className={s.cards}>
            <Carousel
              swipeable={true}
              draggable={false}
              showDots={false}
              responsive={this.responsive}
              infinite={false}
              autoPlay={false}
              keyBoardControl={true}
              customTransition='all 0.5s linear'
              transitionDuration={300}
              removeArrowOnDeviceType={['tablet', 'mobile']}
              deviceType={deviceType}
              itemClass={s.carouselItem}
              ssr={true}
            >
              {Cards}
            </Carousel>
          </div>
        </div>
      );
    }
}

export default CardsView;
