import React from 'react';
import s from './Cards.module.scss';
import {Card, Tooltip} from '@mui/material';
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
import StarIcon from '@mui/icons-material/Star';
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
                        {formatPrice({price, withCurrency: false})}
                    </span> || null


        return <Box
            marginTop={'10px'}
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

    convertImage = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

    toBase64 = (str) =>
        typeof window === 'undefined'
            ? Buffer.from(str).toString('base64')
            : window.btoa(str);

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
                    <Card className={classNames(s.root, classNamesRoot)} onClick={() => this.routeChange(alias)}>
                        <CardActionArea className={s.area}>
                            <Labels
                                salePercent={salePercent}
                                isBestPrice={isBestPrice}
                            />
                            <CardMedia
                                className={s.media}
                            >

                                <Image
                                    placeholder={'blur'}
                                    blurDataURL="/blur.png"
                                    height={180}
                                    width={260}
                                    alt={name}
                                    loader={() => img || "/blur.png"}
                                    quality={50}
                                    className={cn(s.img, {[s.isDoor]: isDoor})}
                                    src={img || "/blur.png"}
                                />
                                <Buttons {...this.props} />
                            </CardMedia>
                            <CardContent className={s.content}>
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
                                {
                                    isPopular && <span className={s.popular}>
                                     <StarIcon className={s.starIcon}/>  <span className={s.mark}> 5 </span> хит продаж
                                    </span> || null
                                }
                                {this.priceRow}
                                {this.colors}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </a>
            </Link>
        );
    }
}

export default CardView;
