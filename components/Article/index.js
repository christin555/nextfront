import React from 'react';
import s from './Cards.module.scss';
import {Card} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import cn from 'classnames';
import {inject} from 'mobx-react';
import Callme from '../Callme';
import AddShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from 'react-router-dom';

const plural = require('plural-ru');

@inject(({RouterStore}) => {
  return {RouterStore};
})
class CardView extends React.Component {

  render() {
    const {isHover} = this.state;
    const {
      title,
      path,
      type,
      content
    } = this.props;

    return (
      <div />
    );
  }
}

export default CardView;
