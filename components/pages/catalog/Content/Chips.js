import React from 'react';
import s from './Content.module.scss';
import {inject, observer} from 'mobx-react';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '../../../Chip';
import {observable, toJS} from "mobx";

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
    if (!this.props.isFilterActive) {
      return <div/>;
    }

    return (
      <div className={s.chips}>
        {this.props.chips.map(({fieldName, label, key, val}) => (
          <Chip
            key={val}
            label={`${fieldName} - ${label}`}
            deleteIcon={<CloseIcon />}
            onDelete={this.removeValue(key, val)}
          />
        ))}
      </div>
    );
  }
}

export default Chips;
