import React from 'react';
import s from './Card.module.scss';
import Button from '../Button';
import NextLink from 'next/link';
import {inject, observer} from "mobx-react";
import Skeleton from '@mui/material/Skeleton';

@inject(`RouterStore`)
@observer
class Card extends React.Component {

    render() {
        return (
                <Skeleton className={s.card} variant="rectangular" animation="wave" />
        );
    }
}

export default Card;
