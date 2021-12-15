import React from 'react';
import s from './Cards.module.scss';


class Labels extends React.Component {

    render() {
        const {
            isPopular,
            isNew,
            withPopularLabel
        } = this.props;


        const blocks = [];

        if (withPopularLabel && isPopular) {
            blocks.push(<div className={s.isPopular}>  ХИТ ПРОДАЖ</div>)
        }
        if (isNew) {
            blocks.push(<div className={s.isNew}> НОВИНКА</div>)
        }

        if (!blocks.length) {
            return <div/>
        }

        return <div className={s.labels}>
            {blocks}
        </div>
    }
}

export default Labels;
