import React from 'react';
import Card from './Card';

const Blocks = ({items, withPhone}) =>
    items.map((item, index) => <Card withPhone={withPhone} key={index} {...item} />);

export default Blocks;
