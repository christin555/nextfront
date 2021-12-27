import s from './Blocks.module.scss';
import doors from '../../../../public/doors.jpg';
import CatalogCard from '../../../CatalogCard';
import Button from '../../../Button';
import NextLink from "next/link";

//заменить на получение с бк
const items = [
  {
    name: 'Двери',
    img: 'https://wide-world.ru/image/catalog/news/dverisruchkami.jpg',
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
    img: 'https://www.tarkett.ru/media/img/large/IN_TEE_OMNISPORTS_V65.jpg',
    alias: 'sport'
  },
  {
    name: 'Керамогранит',
    img: 'https://modern05.ru/upload/iblock/c6e/c6e3c78be9b57ea2f7fc411c9c953f33.jpg',
    alias: 'keramogranit'
  },
  {
    name: 'Паркет',
    img: 'https://www.tarkett.ru/media/img/large/IN_TEE_Salsa_premium.jpg',
    alias: 'parquet'
  },
  {
    name: 'Пробковое покрытие',
    img: 'https://master-pola.com/static/images/2/f1162e0f35b7e9a0748b6df16a773c71.jpg',
    alias: 'probkovoe_pokrytie'
  },
  {
    name: 'Напольный плинтус',
    img: 'https://alpinefloor.su/upload/resize_cache/iblock/baa/455_365_2/1100.jpg',
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
          <span>
            <p>
            В нашем салоне вы можете подобрать для своего помещения напольное покрытие на любой вкус и цвет.
            </p>
            <p>
           С уверенностью гарантируем, что высокое качество нашего товара будет радовать вас долгие годы.
            </p>
          </span>
          <div className={s.buttonContainer}>
            <NextLink href={`/catalog`} passHref>
              <Button
                  className={s.but}
                  variant={'outlined'}
              >
                {'Каталог'}
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
