import * as React from 'react';
import s from '../pages/home/Blocks/Works/Style.module.scss';
import classNames from "classnames";
import {Typography} from "@mui/material";
import formatPrice from "../../src/utils/formatPrice";
import Link from 'next/link';


export default function MultiActionAreaCard({size, id, name, img, price}) {
    return (
        <Link href={{
            pathname: '/work/[id]',
            query: {id}
        }}
              passHref
              shallow={true}>
            <a className={s.card}>
                <div className={classNames(s.workName, s[size])}>
                    {name}
                    {
                        price ? <Typography variant={'body2'}> {formatPrice(price, true, false)} </Typography> :
                            <span/>
                    }
                </div>
                <div className={s.backCard}></div>
                <img src={img}/>
            </a>
        </Link>
    );
}
