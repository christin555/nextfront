import React from 'react';
import {inject} from 'mobx-react';


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
