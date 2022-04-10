import React from 'react';
import s from './Card.module.scss';
import Button from '../Button';
import NextLink from 'next/link';
import {inject, observer} from "mobx-react";
import Image from 'next/image'

@inject(`RootStore`)
@observer
class Card extends React.Component {

    render() {
        const {name, alias, img} = this.props;

        return (
            <div className={s.card}>
                <Image
                    placeholder={'blur'}
                    blurDataURL="/blur.png"
                    quality={50}
                    loader={() => 'https://master-pola.com' + img}
                    src={'https://master-pola.com' + img}
                    width={'100%'}
                    layout="responsive"
                    objectFit={'cover'}
                    height={'100%'}
                    alt={name}
                    className={'image'}
                />
                <div className={s.name}>
                    <NextLink
                        href={`/catalog/[category]`}
                        as={`/catalog/${alias}`}
                        passHref
                        shallow={true}
                    >
                        <Button
                            onClick={() => this.props.RootStore.setCategoryMerge(alias)}
                            className={s.but}
                            variant={'outlined'}
                        >
                            {name}
                        </Button>
                    </NextLink>
                </div>
            </div>
        );
    }
}

export default Card;
