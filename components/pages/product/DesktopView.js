import React from 'react';
import Hierarchy from '../../Hierarchy';
import Carousel from '../../Carousel';
import {Typography} from '@mui/material';
import classNames from 'classnames';
import s from './Product.module.scss';
import Callme from '../../Callme';
import FinishingMaterialBlock from './FinishingMaterialBlock';
import Labels from '../../Cards/labels';
import Calculation from '../../Сalculation';

const DesktopView = (props) => {
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
    articles,
    banner
  } = props;

  return (
    <React.Fragment>
      <Hierarchy hierarchy={hierarchy} className={s.hierarchy} />
      <div className={s.content}>
        <div className={s.header}>
          <Typography component={'h1'} className={s.name}>
            {values.fullName}
          </Typography>
          <div className={s.labels}>
            <span>{values.id && `Арт. ${values.id}`}</span>
            <Labels salePercent={values.salePercent} className={s.sale} />
            <Labels isPopular={values.isPopular} />
            <Labels isBestPrice={values.isBestPrice} className={s.sale} />
            <Labels inStock={values.inStock} />
          </div>
        </div>
        <div className={classNames(s.card, {[s.door]: false})}>
          <Carousel
            name={`${values.brand} ${values.name}`}
            imgs={values?.imgs}
            className={s.carousel}
          />
          <div className={s.product}>
            <Typography
              variant={'body1'}
              fontWeight={'bold'}
              component={'h3'}
            > Коллекция {values.collection}
            </Typography>
            <div
              className={s.desc}
              dangerouslySetInnerHTML={{__html: values.description}}
            />
            {linkInterBlock}
            {
              values.price && (
                <div className={s.priceBox}>
                  {priceRow}
                </div>
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
                category={values.group}
                product={values}
                className={s.calculation}
              />
              <Callme
                product={values}
                className={s.call}
                buttonText={'Быстрый заказ'}
              />
            </div>
            {banner}
          </div>
        </div>
        {chars}
        {articles}
        <div className={s.titleCharacteristic}>
          Характеристики товара
        </div>
        <div className={s.characteristic}>
          {allFields}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DesktopView;
