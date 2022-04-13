import React from 'react';
import s from './Labels.module.scss';
import classNames from "classnames";
import StarIcon from "@mui/icons-material/Star";


class Labels extends React.Component {

    render() {
        const {
            isNew,
            isBestPrice,
            className,
            salePercent,
            isPopular
        } = this.props;


        const blocks = [];

        if (salePercent) {
            blocks.push(<div className={classNames(s.sale, className)}>  {`-${salePercent}%`}</div>)
        }
        if (isBestPrice) {
            blocks.push(<div className={s.isBestPrice}> Лучшая цена</div>)
        }
        if (isPopular) {
            blocks.push(
                <span className={s.popular}>
                                     <StarIcon className={s.starIcon}/>
                <span className={s.mark}> 5.0 </span>
                хит продаж
            </span>)
        }

        if (isNew) {
            blocks.push(<div className={s.isNew}> НОВИНКА</div>)
        }

        if (!blocks.length) {
            return <div/>
        }

        return blocks
    }
}

export default Labels;
