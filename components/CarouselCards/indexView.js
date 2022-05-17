import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from '../Cards/Card';
import {inject, observer} from 'mobx-react';
import s from './styles.module.scss';
import Title from '../Title';

const CardsView = ({popularProducts}) => {
   const responsive = {
     desktop: {
       breakpoint: {max: 3000, min: 1024},
       items: 5,
       slidesToSlide: 1 // optional, default to 1.
     },
     tablet: {
       breakpoint: {max: 1024, min: 464},
       items: 3,
       slidesToSlide: 1 // optional, default to 1.
     },
     mobile: {
       breakpoint: {max: 464, min: 0},
       items: 2,
       slidesToSlide: 2 // optional, default to 1.
     }
   };

     return (
       <div>
         <Title title={'Популярные товары'} className={s.title} />
         <Carousel
           swipeable={true}
           draggable={false}
           showDots={false}
           responsive={responsive}
           infinite={true}
           autoPlay={props.deviceType !== 'mobile'}
           autoPlaySpeed={2000}
           keyBoardControl={true}
           customTransition='all 1s linear'
           transitionDuration={3000}
           containerClass='carousel-container'
           removeArrowOnDeviceType={['tablet', 'mobile']}
           deviceType={props.deviceType}
           itemClass={s.carouselItem}
         >
           {
               popularProducts.map((item, index) => (
               <div key ={index} className={s.cardContainer}>
                   <Card
                       classNamesRoot={s.card}
                       withCategory={true}
                       withPopularLabel={false}
                       withPhone={false}
                       key={index}
                       {...item}
                   />
               </div>
           ))}
         </Carousel>
       </div>
     );
}

export default CardsView;
