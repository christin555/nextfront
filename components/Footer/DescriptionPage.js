import React from 'react';
import s from './DescriptionStyle.module.scss';
import Image from 'next/image';
import {Typography} from "@mui/material";

const Description = ({text, title, media}) => (
    <div className={s.footerAbout}>
        <Typography variant={'subtitle1'} component={'h2'}>{title}</Typography>
        <div className={s.text}>
            {
                media && <div className={s.media}>
                    {media}
                </div> || null
            }
            <div>
                {text}
            </div>
        </div>
    </div>
);

export default Description;
