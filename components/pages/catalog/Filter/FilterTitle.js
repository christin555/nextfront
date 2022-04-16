import React from 'react';
import s from './Filter.module.scss';
import {inject, observer} from 'mobx-react';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../../../Button';

@inject(({RootStore: {ActiveFilterStore}}) => {
  return {
    isActive: ActiveFilterStore.isActive,
    clear: ActiveFilterStore.clear
  };
})
@observer
class FilterTitle extends React.Component {
  render() {
    const {
      clear,
      isActive
    } = this.props;

    return (
      <div className={s.title}>
        <span>{'Фильтр'}</span>
        {
          isActive && (
            <Button
              onClick={clear}
              className={s.clear}
              size={'small'}
              endIcon={<CloseIcon />}
            >
              {'Очистить'}
            </Button>
          ) || null
        }
      </div>
    );
  }
}

export default FilterTitle;
