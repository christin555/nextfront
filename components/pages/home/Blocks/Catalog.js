import s from './Blocks.module.scss';
import doors from '../../../../public/doors.jpg';
import CatalogCard from '../../../CatalogCard';
import Button from '../../../Button';
import NextLink from "next/link";
import React from "react";

//заменить на получение с бк
const items = [
  {
    name: 'Двери',
    img: 'https://master-pola.com/dashboard/uploads/dverisruchkami_0b7530e248.jpg',
    alias: 'doors'
  },
  {
    name: 'Ламинат',
    img: '/laminate.jpg',
    alias: 'laminate'
  },
  {
    name: 'Кварцвинил',
    img: '/quartzvinyl.jpg',
    alias: 'quartzvinyl'
  },
  {
    name: 'Спортивное покрытие',
    img: 'https://master-pola.com/dashboard/uploads/IN_TEE_OMNISPORTS_V65_9eb7111f73.jpg',
    alias: 'sport'
  },
  {
    name: 'Керамогранит',
    img: 'https://master-pola.com/dashboard/uploads/fee1b628a0f559ee6029cd6c9e297338_dadb476b9b.jpg',
    alias: 'keramogranit'
  },
  {
    name: 'Паркет',
    img: 'https://master-pola.com/dashboard/uploads/IN_TEE_Salsa_premium_1693c6be6d.jpg',
    alias: 'parquet'
  },
  {
    name: 'Пробковое покрытие',
    img: 'https://master-pola.com/static/images/2/f1162e0f35b7e9a0748b6df16a773c71.jpg',
    alias: 'probkovoe_pokrytie'
  },
  {
    name: 'Напольный плинтус',
    img: 'https://master-pola.com/dashboard/uploads/233248_914519_bg_53fa4d1d8a.jpg',
    alias: 'napolnyy-plintus'
  }
];

function Blocks( ) {
 const blocksCatalog = items.map(({name, img, alias}, index) => (
    <CatalogCard key={index} name={name} img={img} alias={alias} />
  ));

  return (
    <div className={s.catalogBlock}>
      <div className={s.catalogItems}>
        <div className={s.mainBlock}>
          <div className={s.back}>МАСТЕР <br/> ПОЛА </div>
          <div className={s.buttonContainer}>
            <NextLink href={`/catalog`} passHref>
              <Button
                  className={s.but}
                  variant={'outlined'}
              >
                {' Смотреть весь Каталог'}
              </Button>
            </NextLink>
          </div>
        </div>
        {blocksCatalog}
      </div>
    </div>
  );
};

export default Blocks;
