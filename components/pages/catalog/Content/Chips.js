import React from 'react';
import s from './Content.module.scss';
import {inject, observer} from 'mobx-react';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '../../../Chip';
import {toJS} from "mobx";

@inject(({RootStore: {CatalogStore: {ActiveFilterStore}}}) => {
    return {
        chips: toJS(ActiveFilterStore.chips),
        isFilterActive: ActiveFilterStore.isActive,
        del: ActiveFilterStore.setValue
    };
}) @observer
class Chips extends React.Component {
    removeValue = (key, val) => () => this.props.del(key)(false, {id: val});

    render() {
        const {isFilterActive, chips} = this.props;
        if (!isFilterActive) {
            return <div/>;
        }

        const _chips = []

        for (let {fieldName, label, key, val} of chips.values()) {
            _chips.push(<Chip
                key={val}
                label={`${fieldName} - ${label}`}
                deleteIcon={<CloseIcon/>}
                onDelete={this.removeValue(key, val)}
            />)
        }

        return (
            <div className={s.chips}>
                {_chips}
            </div>
        );
    }
}

export default Chips;
