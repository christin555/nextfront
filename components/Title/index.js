import React from 'react';
import s from './style.module.scss';
import classNames from 'classnames';

const Title = ({title, className}) => (
  <h2 className={classNames(s.title, className)}>{title}</h2>
);

export default Title;
