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
            imgs = [],
            name,
            brand,
            price,
            isPopular,
            isBestPrice,
            withPopularLabel = true,
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
                            <Labels isPopular={isPopular} isBestPrice={isBestPrice}
                                    withPopularLabel={withPopularLabel}/>
                            <CardMedia
                                className={s.media}
                            >
                                <Image
                                    quality={50}
                                    className={cn(s.img, {[s.isDoor]: isDoor})}
                                    src={img || imgs && imgs[0]?.src}
                                    layout='fill'
                                    placeholder={"blur"}
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
                                    <span className={s.name}>{name}</span>
                                </div>
                                {
                                    price && (
                                        <span className={s.price}>{formatPrice({price, isDoor})}</span>
                                    ) || null
                                }
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
