import React from 'react';
import s from './Labels.module.scss';
import classNames from "classnames";
import StarIcon from "@mui/icons-material/Star";


class Labels extends React.Component {

    render() {
        const {
            inStock,
            isNew,
            isBestPrice = true,
            className,
            salePercent,
            isPopular
        } = this.props;


        const blocks = [];

        if(inStock){
            blocks.push(<span className={classNames(s.inStock, className)}>{'В наличии в Тюмени'}</span>)
        }

        if (salePercent) {
            blocks.push(<div className={classNames(s.sale, className)}>  {`- ${salePercent}%`}</div>)
        }

        if (isBestPrice) {
            blocks.push(<div  className={classNames(s.isBestPrice, className)}> Лучшая цена</div>)
        }

        if (isPopular) {
            blocks.push(<div className={s.popular}><StarIcon className={s.starIcon}/>{'хит продаж'} </div>)
        }

        if (isNew) {
            blocks.push(<div className={s.isNew}> НОВИНКА</div>)
        }

        if (!blocks.length) {
            return null
        }

        return blocks
    }
}

export default Labels;
