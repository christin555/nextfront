import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Select from "../../../Select";
import {components} from "react-select";
import SwapVertIcon from "@mui/icons-material/SwapVert";

@inject(({RootStore: {PageStore}}) => {
    return {
        optionsOrder: PageStore.optionsOrder,
        order: PageStore.order,
        setOrder: PageStore.setOrder
    };
}) @observer
class InputSearch extends Component {
    render() {
        const {optionsOrder, order, setOrder} = this.props;
        return (
            <Select
                onChange={setOrder}
                variant={'secondary'}
                options={optionsOrder}
                components={{DropdownIndicator}}
                value={order}
            />
        );
    }
}

const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
            <SwapVertIcon/>
        </components.DropdownIndicator>
    );
};

export default InputSearch;
