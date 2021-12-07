import React from 'react';
import s from './Blocks.module.scss';
import YouTube from 'react-youtube';
import Title from '../../../Title';
import Button from '../../../Button';
import Link from "next/link";
import NextLink from "next/link";

const mock = [
  {
    title: 'Плитка ПВХ? в чем разница между клеевой и замковой? ',
    src: 'FcP7cev5Hl8',
    type: 'youtube'
  },
  {
    title: 'Фрески AFFRESCO',
    src: 'wHxlaxkd8cU',
    type: 'youtube'
  },
  {
    title: 'Ищите интересное и практичное решение для ремонта квартиры?',
    src: 'A8YKSOwEFFE',
    type: 'youtube'
  }

];
const Blog = () => {
  const blocks = mock.map(({title, src}, index) => (
    <div key={index} className={s.article}>
      <YouTube
        className={s.video}
        videoId={src}
        opts={{width: '100%', height: '100%'}}
      />
      <div className={s.titleArticle}> {title} </div>
    </div>
  ));

  return (
    <div className={s.blog}>
      <div className={s.desc}>
        <Title title={'Блог'} />
        <p>
              Наши специалисты имеют многолетний опыт в укладке напольных покрытий и всегда рады поделиться своими знаниями!
        </p>
          <NextLink href={`/catalog`} passHref>
              <Button
                  className={s.buttonArt}
                  variant={'outlined'}
                  to='/gallery'
              >
                  {'ВСЕ СТАТЬИ'}
              </Button>
          </NextLink>
      </div>
      <div className={s.blockArticles}>
        {blocks}
      </div>
    </div>
  );
};

export default Blog;
