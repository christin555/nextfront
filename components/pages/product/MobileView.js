import React from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Chip from '@mui/material/Chip';
import Icons from '../../Icons';
import {inject, observer} from 'mobx-react';
import Hierarchy from '../../Hierarchy';
import Carousel from '../../Carousel';
import {Divider} from '@mui/material';
import classNames from 'classnames';
import s from './ProductMobile.module.scss';
import Callme from '../../Callme';
import {toJS} from 'mobx';
import formatPrice from '../../../src/utils/formatPrice';
import Typography from "@mui/material/Typography";
import CheckIcon from '@mui/icons-material/Check';
import FinishingMaterialBlock from './FinishingMaterialBlock';
import Meta from "../../HeadComponent";
import Box from "@mui/material/Box";
import Labels from "../../Cards/labels";
import Calculation from '../../Сalculation';
import Title from "../../Title";


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
                <Labels isPopular={values.isPopular}/>
                <div className={s.name}>
                    {values.category} {values.name}
                    <span className={s.collection}>
                       {values.brand} {values.collection && `Коллекция ${values.collection}`}
                    </span>
                </div>
                <Labels salePercent={values.salePercent} className={s.sale}/>
                <Box position={'relative'}>

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
                <Labels isBestPrice={values.isBestPrice} className={s.sale}/>

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
