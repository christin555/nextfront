import React from 'react';
import Hierarchy from '../../Hierarchy';
import Carousel from '../../Carousel';
import {Divider, Typography} from '@mui/material';
import classNames from 'classnames';
import s from './Product.module.scss';
import Callme from '../../Callme';
import FinishingMaterialBlock from './FinishingMaterialBlock';
import Labels from "../../Cards/labels";
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
        hierarchy
    } = props;

    return (
        <>
            <Hierarchy hierarchy={hierarchy} className={s.hierarchy}/>
            <div className={s.content}>
                <div className={s.header}>
                    <Typography  component={'h1'} className={s.name}>
                        {values.fullName}
                    </Typography>
                    <div className={s.labels}>
                        <span>{values.id && `Арт. ${values.id}`}</span>
                        <Labels salePercent={values.salePercent} className={s.sale}/>
                        <Labels isPopular={values.isPopular}/>
                        <Labels isBestPrice={values.isBestPrice} className={s.sale}/>
                    </div>
                </div>
                <div className={classNames(s.card, {[s.door]: !!values.finishingMaterial})}>
                    <Carousel
                        name={`${values.brand} ${values.name}`}
                        imgs={values?.imgs}
                        className={s.carousel}
                    />
                    <div className={s.product}>
                        <Typography variant={'body1'} fontWeight={'bold'} component={'h3'}> Коллекция {values.collection}</Typography>
                        <div className={s.desc}> {values.description} </div>
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
                        <FinishingMaterialBlock fields={fields}/>
                        <div className={s.additional}>
                            {chipFields}
                        </div>
                        <div className={s.btnBox}>
                            <Calculation
                                product={values}
                                className={s.calculation}
                                buttonText={'Оставить заявку'}
                            />
                            <Callme
                                product={values}
                                className={s.call}
                                buttonText={'Быстрый заказ'}
                            />
                        </div>
                    </div>
                </div>
                {chars}
                <div className={s.titleCharacteristic}>
                    Характеристики товара
                </div>
                <div className={s.characteristic}>
                    {allFields}
                </div>
            </div>
        </>
    );
};

export default DesktopView;
