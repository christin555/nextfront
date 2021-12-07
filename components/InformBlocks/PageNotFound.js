import React from 'react';
import s from './style.module.scss';
import PageNotFoundIcon from '../Icons/PageNotFound';
import {Link} from 'react-router-dom';

const PageNotFound = () => (
  <div className={s.containerNotFound}>
    <h1> Упс... кажется, вы заблудились </h1>
    <Link to={'/'}> Вернуться на главную страницу </Link>
    <PageNotFoundIcon className={s.notFoundIcon} />
  </div>
);

export default PageNotFound;
