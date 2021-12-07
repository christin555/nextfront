import React from 'react';
import s from './Blocks.module.scss';
import Chars from './Chars';
import Catalog from './Catalog';
import About from './About';
import Blog from './Blog';
import Popular from '../../../Popular';

const Blocks = () => (
  <div className={s.homeBlocks}>
    <Chars />
    <Catalog />
    <Popular/>
    <About />
    <Blog />
  </div>
);

export default Blocks;
