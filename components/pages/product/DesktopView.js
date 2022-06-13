import React from 'react';
import Hierarchy from '../../Hierarchy';
import Carousel from '../../Carousel';
import {Divider} from '@mui/material';
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
                    <div className={classNames(s.card, {[s.door]: !!values.finishingMaterial})}>
                        <Carousel
                            name={`${values.brand} ${values.name}`}
                            imgs={values?.imgs}
                            className={s.carousel}
                        />
                        <div className={s.product}>
                            <span className={s.brand}>
                                  {values.category} {values.brand}
                                <Labels salePercent={values.salePercent} className={s.sale}/>
                            </span>
                            <Labels isPopular={values.isPopular}/>
                            <div className={s.name}>
                                {values.name}
                                <span className={s.collection}>
                                    {values.collection && `Коллекция ${values.collection}`}
                                </span>
                            </div>
                            <Divider/>
                            <div className={s.desc}> {values.description} </div>
                            <Labels isBestPrice={values.isBestPrice} className={s.sale}/>
                            {
                                values.price && (
                                    <div className={s.priceBox}>
                                        Цена:
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
                                    buttonText={'Оставить заявку'}
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
    }

export default DesktopView;
