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
                    quality={50}
                    priority={true}
                    loader={()=> img}
                    src={img}
                    layout="fill"
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
