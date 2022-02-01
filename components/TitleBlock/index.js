import React from 'react';
import s from './style.module.scss';
import classNames from 'classnames';
import {Typography} from "@mui/material";

const Title = ({title, className}) => (
        <Typography component={'h3'} variant={'h6'} className={classNames(s.title, className)}>
            {title}
        </Typography>
);

export default Title;
