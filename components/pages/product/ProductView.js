import React from 'react';
import Chip from '@mui/material/Chip';
import Icons from '../../Icons';
import {inject, observer} from 'mobx-react';
import s from './Product.module.scss';
import {toJS} from 'mobx';
import formatPrice from '../../../src/utils/formatPrice';
import Typography from "@mui/material/Typography";
import CheckIcon from '@mui/icons-material/Check';
import Meta from "../../HeadComponent";
import Box from "@mui/material/Box";
import MobileView from './MobileView';
import DesktopView from "./DesktopView";

@inject(({RootStore: {ProductStore, deviceType}}) => {
    return {
        values: toJS(ProductStore.values || {}),
        fields: ProductStore.fields || [],
        hierarchy: ProductStore.hierarchy || [],
        alias: ProductStore.alias,
        deviceType
    };
}) @observer
class ProductView extends React.Component {
    get mainFields() {
        const {values, fields} = this.props;
        const rows = [];

        fields.filter(({type}) => type === 'isMain').forEach(({title, name}) => {
            if (values[name]) {
                rows.push(
                    <div className={s.row} key={name}>
                        <div>
                            <span>
                                {title}
                            </span>
                            <span>
                                {values[name]}
                            </span>
                        </div>
                    </div>
                );
            }
        });

        if (!rows.length) {
            return null
        }
        return rows;
    }

    get chipFields() {
        const {values, fields} = this.props;
        const rows = [];

        fields.filter(({type}) => type === 'isChip').forEach(({title, name, icon}) => {
            const Icon = Icons[icon];
            const val = `${title} - ${values[name]}`;

            if (values[name]) {
                rows.push(
                    <Chip key={val} label={val} icon={Icon && <Icon className={s.iconChip}/> || null}/>
                );
            }
        });

        if (!rows.length) {
            return <div/>
        }

        return rows;
    }


    //переделать на array2object по type
    //Хорошо
    get allFields() {
        const {values, fields} = this.props;
        const rows = [];

        fields.forEach(({title, name}) => {
            if (values[name] && title) {
                rows.push(
                    <div className={s.row} key={name}>
                        <div>
                            <span>{title}</span> <span> {values[name]}</span>
                        </div>
                    </div>
                );
            }
        });

        if (!rows.length) {
            return null
        }

        return rows;
    }

    get chars() {
        const chars = JSON.parse(this.props.values?.chars || null);

        if (!chars || !Array.isArray(chars)) {
            return <div/>
        }

        return (
            <div className={s.charsBlock}>
                {chars.map(({key, value}) => {
                    return <div key={key}>
                        <Typography variant="button" component="h6" display={'flex'}>
                            <CheckIcon className={s.charIcon}/> {key}
                        </Typography>
                        <span> {value} </span>
                    </div>
                })}
            </div>
        );
    }

    get categoryAlias() {
        const {hierarchy} = this.props;
        return hierarchy[hierarchy.length - 1]?.alias
    }

    get breadcumbs() {
        const {values} = this.props;

        return {
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement":
                [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "item":
                            {
                                "@id": "https://master-pola.com/catalog",
                                "name": "Каталог"
                            }
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "item":
                            {
                                "@id": `https://master-pola.com/catalog/${this.categoryAlias}`,
                                "name": values.category
                            }
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "item":
                            {
                                "@id": `https://master-pola.com/product/${this.props.alias}`,
                                "name": values.brand
                            }
                    }
                ]
        }
    }


    get priceRow() {
        const {price, salePrice, unit} = this.props.values;
        const currentPrice = salePrice || price;

        if (!currentPrice) {
            return null
        }

        const priceBlock = <span className={s.price}>
                {formatPrice({price: currentPrice, unit})}
                </span>;

        const oldPrice = salePrice && <span className={s.salePrice}>
                        {formatPrice({price, unit})}
                    </span> || null


        return <Box
            display={'flex'}
            alignItems={'center'}
        >
            {priceBlock}
            {oldPrice}
        </Box>
    }

    render() {
        const {values, hierarchy, fields, deviceType} = this.props;
        const isMobile = deviceType === 'mobile';

        return (
            <>
                <Meta
                    image={values?.imgs?.[0].src}
                    desc={`Купить ${values.category} ${values.brand} ${values.collection} в Тюмени по выгодной цене`}
                    title={`${values.category} ${values.name} от ${values.brand} - ${values.price} - Мастер Пола`}
                    breadcumbs={this.breadcumbs}
                />
                {
                    isMobile &&
                    <MobileView
                        values={values}
                        fields={fields}
                        hierarchy={hierarchy}
                        priceRow={this.priceRow}
                        mainFields={this.mainFields}
                        allFields={this.allFields}
                        chipFields={this.chipFields}
                        chars={this.chars}/>
                    || <DesktopcharsView
                        values={values}
                        fields={fields}
                        hierarchy={hierarchy}
                        priceRow={this.priceRow}
                        mainFields={this.mainFields}
                        allFields={this.allFields}
                        chipFields={this.chipFields}
                        chars={this.chars}/>
                }
            </>
        );
    }
}

export default ProductView;
