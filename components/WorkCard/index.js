import * as React from 'react';
import s from '../pages/home/Blocks/Works/Style.module.scss';
import {Typography} from "@mui/material";
import formatPrice from "../../src/utils/formatPrice";
import Link from 'next/link';


export default function MultiActionAreaCard({onClick, id, name, img, amount, price}) {


    return (
        <Link href={{
            pathname: '/work/[id]',
            query: {id}
        }}
              passHref
              shallow={true}>
            <div className={s.card} onClick={() => onClick && onClick(id)}>
                <div className={s.mediaBlock}>  <img src={img}/> </div>
                <div className={s.workName}>
                 <div>
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
                    <a className={s.button} onClick={() => onClick && onClick(id)}> Подробнее </a>
                </div>

            </div>
        </Link>
    );
}
