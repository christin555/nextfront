import * as React from 'react';
import s from '../pages/home/Blocks/Works/Style.module.scss';
import {Typography} from "@mui/material";
import formatPrice from "../../src/utils/formatPrice";
import Link from 'next/link';
import Image from 'next/image'

export default function MultiActionAreaCard({onClick, id, title, imgPreview, amount}) {

    return (
        <Link href={{
            pathname: '/work/[id]',
            query: {id}
        }}
              passHref
              shallow={true}>
            <div className={s.card} onClick={() => onClick && onClick(id)}>
                <div className={s.mediaBlock}>
                    <Image
                        quality={75}
                        width={300}
                        height={200}
                        alt={title}
                        src={imgPreview}
                    />
                </div>
                <div className={s.workName}>
                    <div>
                        {title}
                        <Typography variant={'body2'} className={s.amount}>
                            {amount}
                        </Typography>
                    </div>
                    <a className={s.button} onClick={() => onClick && onClick(id)}> Подробнее </a>
                </div>
            </div>
        </Link>
    );
}
