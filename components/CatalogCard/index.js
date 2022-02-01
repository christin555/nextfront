import React from 'react';
import s from './Card.module.scss';
import Button from '../Button';
import NextLink from 'next/link';
import {inject, observer} from "mobx-react";

@inject(`RootStore`)
@observer
class Card extends React.Component {

    render() {
        const {name, alias, img} = this.props;

        return (
            <div className={s.card}>
                <img src={img}/>
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
