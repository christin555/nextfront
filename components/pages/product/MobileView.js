import React from 'react';
import Hierarchy from '../../Hierarchy';
import Carousel from '../../Carousel';
import {Divider} from '@mui/material';
import s from './ProductMobile.module.scss';
import Callme from '../../Callme';
import FinishingMaterialBlock from './FinishingMaterialBlock';
import Box from '@mui/material/Box';
import Labels from '../../Cards/labels';
import Calculation from '../../Сalculation';

const Product = (props) => {
  const {
    values,
    fields,
    priceRow,
    mainFields,
    allFields,
    chipFields,
    chars,
    hierarchy,
    linkInterBlock,
    banner,
    articles
  } = props;

  const lastCategory = hierarchy[hierarchy.length - 2];

  return (
    <React.Fragment>
      <div className={s.content}>
        <Hierarchy hierarchy={[lastCategory]} className={s.hierarchy} />
        <div className={s.name}>
          {values.category} {values.name}
          <span className={s.collection}>
            {values.brand} {values.collection && `Коллекция ${values.collection}`}
          </span>
          <span className={s.id}>
            {values.id && `арт. ${values.id}`}
          </span>
          <Labels isBestPrice={values.isBestPrice} className={s.isBestPrice} />
        </div>
        <Box display={'flex'} gap={'8px'}>
          <Labels inStock={values.inStock} />
          <Labels isPopular={values.isPopular || true} />
        </Box>
        <Box position={'relative'} marginTop={'10px'}>
          <Labels salePercent={values.salePercent} className={s.sale} />
          <Carousel
            imgs={values?.imgs || []}
            className={s.carousel}
          />
        </Box>
        {linkInterBlock}
        {
          values.price && (
            <React.Fragment>
              <div className={s.priceBox}>{priceRow}</div>
              <Divider />
            </React.Fragment>
          ) || null
        }
        <div className={s.chars}>
          {mainFields}
        </div>
        <FinishingMaterialBlock fields={fields} />
        <div className={s.additional}>
          {chipFields}
        </div>
        <div className={s.btnBox}>
          <Calculation
            product={values}
            category={values.group}
            className={s.calculation}
          />
          <Callme
            product={values}
            className={s.call}
            buttonText={'Оставить заявку'}
          />
        </div>
        {banner}
      </div>
      {chars}
      {
        values.description ? (
          <React.Fragment>
            <div className={s.titleCharacteristic}>
              О товаре
            </div>
            <div
              className={s.desc}
              dangerouslySetInnerHTML={{__html: values.description}}
            />
          </React.Fragment>
        ) : null
      }
      {articles}
      {
        allFields ? (
          <React.Fragment>
            <div className={s.titleCharacteristic}>
              Характеристики товара
            </div>
            <div className={s.characteristic}>
              {allFields}
            </div>
          </React.Fragment>
        ) : null
      }
    </React.Fragment>
  );
};

export default Product;
