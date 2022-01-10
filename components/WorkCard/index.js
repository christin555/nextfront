import * as React from 'react';
import s from '../pages/home/Blocks/Works/Style.module.scss';
import classNames from "classnames";
import {Typography} from "@mui/material";
import formatPrice from "../../src/utils/formatPrice";
import Link from 'next/link';


export default function MultiActionAreaCard({onClick, size, id, name, img, amount, price}) {


    return (
        <Link href={{
            pathname: '/work/[id]',
            query: {id}
        }}
              passHref
              shallow={true}>
            <a className={s.card} onClick={() => onClick && onClick(id)}>
                <div className={classNames(s.workName, s[size])}>
                    {name}
                    <Typography variant={'body2'} className={s.amount} >
                     {amount}
                    </Typography>
                    {
                        price ? <Typography variant={'body2'}>
                                {formatPrice(price, true, false)}
                        </Typography> :
                            <span/>
                    }
                </div>
                <div className={s.backCard}></div>
                <img src={img}/>
            </a>
        </Link>
    );
}
