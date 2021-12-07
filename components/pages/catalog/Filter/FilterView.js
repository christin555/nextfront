import React from 'react';
import s from './Filter.module.scss';
import FilterTitle from './FilterTitle';

const Filter = (props) => (
  <div className={s.filter}>
    <FilterTitle />
    {props.children}
  </div>
);

export default Filter;
