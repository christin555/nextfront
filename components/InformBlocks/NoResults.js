import React from 'react';
import s from './style.module.scss';
import NoResultsIcon from '../Icons/NoResults';

const NoResults = ({label}) => (
  <div className={s.containerNoResults}>
    <h2> К сожалению, по вашему запросу {label && `«${label}»`} ничего не найдено </h2>
    <NoResultsIcon className={s.noResultsIcon} />
  </div>
);

export default NoResults;
