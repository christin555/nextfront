import React from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Chip from '@mui/material/Chip';
import Icons from '../../Icons';
import {inject, observer} from 'mobx-react';
import Hierarchy from '../../Hierarchy';
import Carousel from '../../Carousel';
import {Divider} from '@mui/material';
import classNames from 'classnames';
import s from './Product.module.scss';
import Callme from '../../Callme';
import {toJS} from 'mobx';
import formatPrice from '../../../src/utils/formatPrice';
import Head from "next/head";
import Typography from "@mui/material/Typography";
import CheckIcon from '@mui/icons-material/Check';
import FinishingMaterialBlock from './FinishingMaterialBlock';

@inject(({RootStore: {ProductStore}}) => {
    return {
        values: toJS(ProductStore.values || {}),
        fields: ProductStore.fields || [],
        hierarchy: ProductStore.hierarchy || [],
        alias: ProductStore.alias
    };
}) @observer
class Product extends React.Component {
    get mainFields() {
        const {values, fields} = this.props;
        const rows = [];

        fields.filter(({type}) => type === 'isMain').forEach(({title, name}) => {
            if (values[name]) {
                rows.push(
                    <div className={s.row}>
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

            if (values[name]) {
                rows.push(
                    <Chip label={`${title} - ${values[name]}`} icon={Icon && <Icon className={s.iconChip}/> || null}/>
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
                    <div className={s.row}>
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
                        <Typography variant="button" component="h6">
                            <CheckIcon className={s.charIcon}/> {key}
                        </Typography>
                        <span> {value} </span>
                    </div>
                })}
            </div>
        );
    }

    render() {
        const {values, hierarchy, fields} = this.props;

        return (
            <>
                <Head>
                    <title>    {values.name} | Мастер Пола</title>
                    <meta name='description'
                          content={`Купить ${values.category} ${values.brand} коллекция ${values.collection}, ${values.name}`}/>
                    <script type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify(
                                    {
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
                                                            "@id": `https://master-pola.com/catalog/${hierarchy[hierarchy.length - 1]?.alias}`,
                                                            "name": hierarchy[hierarchy.length - 1]?.name
                                                        }
                                                },
                                                {
                                                    "@type": "ListItem",
                                                    "position": 2,
                                                    "item":
                                                        {
                                                            "@id": `https://master-pola.com/product/${this.props.alias}`,
                                                            "name": `${values.brand} ${values.name}`
                                                        }
                                                }
                                            ]
                                    }
                                )
                            }}
                    ></script>
                </Head>
                <Hierarchy hierarchy={hierarchy} className={s.hierarchy}/>
                <div className={s.content}>
                    <div className={classNames(s.card, {[s.door]: !!values.finishingMaterial})}>
                        <Carousel
                            imgs={values?.imgs || []}
                            className={s.carousel}
                        />
                        <div className={s.product}>
                            <span className={s.brand}>
                                  {values.category} {values.brand}
                            </span>
                            <title className={s.name}>
                                {values.name}
                                <span className={s.collection}>
                                    {values.collection && `Коллекция ${values.collection}`}
                                </span>
                            </title>
                            <Divider/>
                            <description className={s.desc}> {values.description} </description>
                            {
                                values.price && (
                                    <div className={s.price}>
                    <span className={s.value}>
                      <MonetizationOnIcon className={s.icon}/>
                        {formatPrice(values.price)}
                    </span>
                                    </div>
                                ) || null
                            }
                            <div className={s.chars}>
                                {this.mainFields}
                            </div>
                            <FinishingMaterialBlock fields={fields}/>
                            <div className={s.additional}>
                                {this.chipFields}
                            </div>
                            <div>
                                <Callme
                                    product={values}
                                    className={s.call}
                                    buttonText={'Оставить заявку'}
                                />
                            </div>
                        </div>
                    </div>
                    {this.chars}
                    <div className={s.titleCharacteristic}>
                        Характеристики товара
                    </div>
                    <div className={s.characteristic}>
                        {this.allFields}
                    </div>
                </div>
            </>
        );
    }
}

export default Product;
