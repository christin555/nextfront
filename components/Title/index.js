import React from 'react';
import s from './style.module.scss';
import classNames from 'classnames';
import {Typography} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NextLink from "next/link";
import Button from "../Button";

const Title = ({title, className, pathname}) => (
    <div className={s.header}>
        {
            pathname &&
            <NextLink href={{pathname}} shallow={true}>
                <ArrowBackIosNewIcon className={s.iconLast} style={{cursor: 'pointer'}}/>
            </NextLink> || null
        }
        <Typography
            component={'h1'}
            variant={'h4'}
            className={classNames(s.title, className)}>
            {title}
        </Typography>
    </div>
);

export default Title;
