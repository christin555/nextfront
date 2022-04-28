import React from 'react';
import s from './Cards.module.scss';
import {Card} from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {inject, observer} from 'mobx-react';
import Link from 'next/link';
import formatPrice from '../../src/utils/formatPrice';
import classNames from 'classnames';
import Image from 'next/image'

@inject('RouterStore') @observer

class CardView extends React.Component {

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
            img,
            name,
            price,
            classNamesRoot
        } = this.props;

        return (
            <div>
                <div className={classNames(s.root, classNamesRoot)}>
                            <Image
                                placeholder={'blur'}
                                blurDataURL="/blur.png"
                                alt={name}
                                quality={65}
                                className={s.img}
                                src={img}
                                layout='fill'
                            />
                </div>
                <div className={s.content}>
                    <b>{name}</b>
                    {
                        price && (
                            <p className={s.price}>
                                            {formatPrice({price})}
                                        </p>
                        ) || null
                    }
                </div>
            </div>
            /*</a>*/
            // </Link>
        );
    }
}

export default CardView;
