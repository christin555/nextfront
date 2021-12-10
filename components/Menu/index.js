import React, {Component} from 'react';
import 'react-multi-carousel/lib/styles.css';
import {inject, observer} from 'mobx-react';
import MenuView from "./menu";

@inject('RootStore')
@observer
class InputSearch extends Component {
    render() {
        return <MenuView/>;
    }
}

export default InputSearch;
