import s from './Blocks.module.scss';
import doors from '../../../../public/doors.jpg';
import CatalogCard from '../../../CatalogCard';
import Button from '../../../Button';
import NextLink from 'next/link';
import React from 'react';

//заменить на получение с бк
const items = [
  {
    name: 'Двери',
    img: '/dashboard/uploads/photo_2022_01_25_21_01_38_f1a32e838d.jpg',
    alias: 'doors'
  },
  {
    name: 'Ламинат',
    img: '/dashboard/uploads/laminat_solid_chic_alsafloor_foto_v_interere_6_aa60f3c35c.jpg',
    alias: 'laminate'
  },
  {
    name: 'Кварцвинил',
    img: '/dashboard/uploads/ba72e6_b3a05b7df61e406cba189eea66a94a9f_mv2_aef523142e.jpg',
    alias: 'quartzvinyl'
  },
  // {
  //   name: 'Спортивное покрытие',
  //   img: '/dashboard/uploads/072420_1_ca4222c651.jpeg',
  //   alias: 'sport'
  // },
  {
    name: 'Керамогранит',
    img: '/dashboard/uploads/330db195af6f0c5679e31849367988f1_9ea988a2da.jpg',
    alias: 'keramogranit'
  },
  // {
  //   name: 'Паркет',
  //   img: '/dashboard/uploads/IN_TEE_Salsa_premium_1693c6be6d.jpg',
  //   alias: 'parquet'
  // },
  // {
  //   name: 'Пробковое покрытие',
  //   img: '/dashboard/uploads/52ec984cc72302fd412e2aa145a6526c_XL_3564cf1886.jpg',
  //   alias: 'probkovoe_pokrytie'
  // },
  {
    name: 'Напольный плинтус',
    img: '/dashboard/uploads/233248_914519_bg_53fa4d1d8a.jpg',
    alias: 'napolnyy_plintus'
  }
];

function Blocks() {
  const blocksCatalog = items.map(({name, img, alias}, index) => (
    <CatalogCard key={index} name={name} img={img} alias={alias} />
  ));

  return (
    <div className={s.catalogBlock}>
      <div className={s.catalogItems}>
        <div className={s.mainBlock}>
          <div className={s.back}>МАСТЕР <br /> ПОЛА </div>
          <div className={s.buttonContainer}>
            <NextLink href={`/catalog`} passHref={true}>
              <Button
                className={s.but}
                variant={'outlined'}
              >
                {'Смотреть весь каталог'}
              </Button>
            </NextLink>
          </div>
        </div>
        {blocksCatalog}
      </div>
    </div>
  );
}

export default Blocks;
