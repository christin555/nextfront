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
        const {price, salePrice, isDoor} = this.props;
        const currentPrice = salePrice || price;

        if (!currentPrice) {
            return null
        }

        const priceBlock = <span className={s.price}>
                {formatPrice({price: currentPrice, isDoor})}
                </span>;

        const oldPrice = salePrice && <span className={s.salePrice}>
                        {formatPrice({price, isDoor})}
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
            name,
            brand,
            isPopular,
            isBestPrice,
            salePercent,
            withCategory = false,
            category,
            classNamesRoot
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
                                    alt={`${category} в Тюмени - ${name}`}
                                    loader={() => img || "/blur.png"}
                                    quality={50}
                                    className={cn(s.img, {[s.isDoor]: isDoor})}
                                    src={img || "/blur.png"}
                                />
                            </CardMedia>
                            <CardContent className={s.content}>
                                {this.priceRow}
                                {
                                    withCategory ? <span className={s.categoryName}> {category} </span> : null
                                }
                                <div className={s.header}>  {
                                    brand && (
                                        <span className={s.brand}>
                                            {brand}
                                            {this.collectionLabel}
                                        </span>
                                    )
                                }
                                    <span className={s.name}>
                                        {name}
                                    </span>
                                </div>
                                <Labels isPopular={isPopular}/>
                                {this.colors}
                            </CardContent>
                        </div>
                    </div>
                </a>
            </Link>
        );
    }
}

export default CardView;
