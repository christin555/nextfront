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
            // <Link href={{
            //     pathname: '/service/[id]',
            //     query: {id: alias}
            // }}
            //       as={`/service/${alias}`}
            //       passHref
            //       shallow={true}>
            /*<a className={classNames(s.aComonent)}>*/
            <div>
                <Card className={classNames(s.root, classNamesRoot)}>
                    <CardActionArea className={s.area}>
                        <CardMedia
                            className={s.media}
                        >
                            <img
                                className={s.img}
                                src={img}
                                layout='fill'
                            />
                        </CardMedia>
                    </CardActionArea>
                </Card>
                <div className={s.content}>
                    <span>{name}</span>
                    {
                        price && (
                            <span className={s.price}>
                                            {formatPrice(price)}
                                        </span>
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
