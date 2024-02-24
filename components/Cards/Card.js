import React from 'react';
import s from './Cards.module.scss';
import {Card} from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import cn from 'classnames';
import {inject, observer} from 'mobx-react';
import Buttons from './Buttons';
import Link from 'next/link';
import formatPrice from '../../src/utils/formatPrice';
import classNames from 'classnames';
import Labels from './labels';
import Image from 'next/image'
import Box from "@mui/material/Box";

const plural = require('plural-ru');

@inject('RouterStore') @observer
class CardView extends React.Component {
    get collectionLabel() {
        const {collection} = this.props;

        if (!collection) {
            return null;
        }

        return <span> {`| ${collection}`} </span>;
    }

    get priceRow() {
        const {price, salePrice, unit} = this.props;
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

    get colors() {
        const {finishingMaterial = []} = this.props;

        if (!finishingMaterial || !finishingMaterial.length) {
            return null;
        }

        const finishingMateriaLabel = plural(
            finishingMaterial.length,
            'оттенок',
            'оттенка',
            'оттенков'
        );

        return (
            <span className={s.colors}>
        {`${finishingMaterial.length} ${finishingMateriaLabel}`}
      </span>
        );
    }

    get collection(){
        const {collection} = this.props;
        if(!collection){
            return null
        }
       return  <span className={s.collection}>
           коллекция {collection}
        </span>
    }

    routeChange = (alias) => {
        const pathname = `/product/${alias}`;

        this.props.RouterStore.push({
                pathname: '/product/[id]',
                query: {
                    id: alias
                },
            }
        );
    }

    render() {
        const {
            alias,
            isDoor,
            img,
            fullName,
            isPopular,
            isBestPrice,
            salePercent,
            classNamesRoot,
            collection,
            category,
            inStock,
            id
        } = this.props;

        return (
            <Link href={{
                pathname: '/product/[id]',
                query: {id: alias}
            }}
                  as={`/product/${alias}`}
                  passHref
                  shallow={true}>
                <a className={classNames(s.aComonent)}>
                    <div className={classNames(s.root, classNamesRoot)} onClick={() => this.routeChange(alias)}>
                        <div className={s.area}>
                            <CardMedia
                                className={s.media}
                            >
                                <Labels
                                    salePercent={salePercent}
                                    isBestPrice={isBestPrice}
                                />
                                <Image
                                    placeholder={'blur'}
                                    blurDataURL="/blur.png"
                                    height={180}
                                    width={260}
                                    alt={`${fullName} в Тюмени`}
                                    loader={() => img || "/blur.png"}
                                    quality={80}
                                    className={cn(s.img, {[s.isDoor]: isDoor || category === 'Двери'})}
                                    //потом поправлю
                                    src={img || "/blur.png"}
                                />
                            </CardMedia>
                            <CardContent className={s.content}>
                                <div className={s.header}>
                                    <span className={s.code}>
                                       Арт. {id}
                                    </span>
                                    {this.priceRow}
                                    <span className={s.name}>
                                        {fullName}
                                    </span>
                                    {this.collection}
                                    {this.colors}
                                    <Labels
                                      inStock={inStock}
                                      isPopular={isPopular}
                                    />
                                </div>
                            </CardContent>
                        </div>
                    </div>
                </a>
            </Link>
        );
    }
}

export default CardView;
