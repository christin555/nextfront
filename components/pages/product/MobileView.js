import React from 'react';
import Hierarchy from '../../Hierarchy';
import Carousel from '../../Carousel';
import {Divider} from '@mui/material';
import s from './ProductMobile.module.scss';
import Callme from '../../Callme';
import FinishingMaterialBlock from './FinishingMaterialBlock';
import Box from "@mui/material/Box";
import Labels from "../../Cards/labels";
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
        hierarchy
    } = props;

    const lastCategory = hierarchy[hierarchy.length - 2];

    return (
        <>
            <div className={s.content}>
                <Hierarchy hierarchy={[lastCategory]} className={s.hierarchy}/>
                <div className={s.name}>
                    {values.category} {values.name}
                    <span className={s.collection}>
                       {values.brand} {values.collection && `Коллекция ${values.collection}`}
                    </span>
                    <span className={s.id}>
                        {values.id && `Арт. ${values.id}`}
                    </span>
                    <Labels isBestPrice={values.isBestPrice} className={s.isBestPrice}/>
                </div>
                <Labels isPopular={values.isPopular}/>
                <Box position={'relative'} marginTop={'10px'}>
                    <Labels salePercent={values.salePercent} className={s.sale}/>
                    <Carousel
                        imgs={values?.imgs || []}
                        className={s.carousel}
                    />
                </Box>
                {
                    values.price && (
                        <div className={s.priceBox}>{priceRow}</div>
                    ) || null
                }

                <Divider/>
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
            <div className={s.titleCharacteristic}>
                О товаре
            </div>
            <div className={s.desc}> {values.description} </div>
            {chars}
            <div className={s.titleCharacteristic}>
                Характеристики товара
            </div>
            <div className={s.characteristic}>
                {allFields}
            </div>
        </>
    );
}

export default Product;
