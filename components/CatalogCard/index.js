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
            <NextLink
                href={`/catalog/[category]`}
                as={`/catalog/${alias}`}
                passHref
                shallow={true}
            >
                <div className={s.card} onClick={() => this.props.RootStore.setCategoryMerge(alias)}>
                    <Image
                        placeholder={'blur'}
                        blurDataURL="/blur.png"
                        quality={50}
                        loader={() => img}
                        src={img}
                        width={'100%'}
                        layout="responsive"
                        objectFit={'cover'}
                        height={'100%'}
                        alt={name}
                        className={'image'}
                    />
                    <div className={s.name}>
                        <Button
                            onClick={() => this.props.RootStore.setCategoryMerge(alias)}
                            className={s.but}
                            variant={'outlined'}
                        >
                            {name}
                        </Button>

                    </div>
                </div>
            </NextLink>
        );
    }
}

export default Card;
