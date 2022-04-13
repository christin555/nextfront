import React from 'react';
import s from './Cards.module.scss';


class Labels extends React.Component {

    render() {
        const {
            isNew,
            isBestPrice,
            withPopularLabel,
            salePercent
        } = this.props;


        const blocks = [];

        if (salePercent) {
            blocks.push(<div className={s.sale}>  {`-${salePercent}%`}</div>)
        }
        if (isBestPrice) {
            blocks.push(<div className={s.isBestPrice}> Лучшая цена</div>)
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
