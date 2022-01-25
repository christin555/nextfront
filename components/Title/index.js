import React from 'react';
import s from './style.module.scss';
import classNames from 'classnames';

const Title = ({title, className}) => (
  <h3 className={classNames(s.title, className)}>{title}</h3>
);

export default Title;
