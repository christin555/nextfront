import React from 'react';
import s from './Blocks.module.scss';
import Chars from './Chars';
import Catalog from './Catalog';
import About from './About';
import Blog from './Blog';
import Popular from './Popular';
import Works from './Works';
import Contact from './Contact';

const Blocks = () => (
  <div className={s.homeBlocks}>
    <Chars />
    <Catalog />
    <Popular />
    <Works />
    <Contact />
    <Blog />
    <About />
  </div>
);

export default Blocks;
