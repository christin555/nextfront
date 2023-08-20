import React from 'react';
import s from './DescriptionStyle.module.scss';
import {Typography} from '@mui/material';

const Description = ({text, title, media}) => (
  <div className={s.footerAbout}>
    <div className={s.text}>
      {
        media && (
          <div className={s.media}>
            {media}
          </div>
        ) || null
      }
      <div>
        <Typography variant={'h6'} component={'h2'} margin={'10px 0'}>{title}</Typography>
        {text}
      </div>
    </div>
  </div>
);

export default Description;
