import ReviewsView from '../../components/pages/reviews';
import React from 'react';
import Meta from '../../components/HeadComponent';
import Title from '../../components/Title';

const breadcrumbs = {
  '@context': 'http://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement':
    [
      {
        '@type': 'ListItem',
        'position': 1,
        'item':
          {
            '@id': 'https://master-pola.com/reviews',
            'name': 'Отзывы о магаизне Мастер Пола'
          }
      }
    ]
};

const Reviews = () => (
  <React.Fragment>
    <Meta
      desc={'Удивлять вас высоким качеством услуг и превосходить любые ожидания — наша главная задача!' +
      'За всё время работы мы заслужили репутацию надежной компании благодаря' +
      'ответственному и качественному подходу,' +
      'высоким компетенциям каждого сотрудника и знанию своего дела.' +
      'На все выполненные работы предоставлется гарантия'}
      title={'Отзывы о магазине Мастер Пола'}
      breadcumbs={breadcrumbs}
    />
    <ReviewsView />
  </React.Fragment>
);

export default Reviews;

