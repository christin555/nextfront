import React, {Component} from 'react';
import 'react-multi-carousel/lib/styles.css';
import {inject, observer} from 'mobx-react';
import Select from "../../../Select";
import {components} from "react-select";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {IconButton} from "@mui/material";
import classNames from "classnames";
import s from "./Content.module.scss";

@inject(({RootStore: {PageStore}}) => {
    return {
        setLimit: PageStore.setLimit,
        limit: PageStore.limit,
    };
}) @observer
class Limit extends Component {
    render() {
        const {limit, setLimit} = this.props;

        return <Select
            variant={'secondary'}
            onChange={setLimit}
            size={'small'}
            options={
                [12, 24, 36].map((item) => {
                    return {value: item, label: `Показывать по ${item}`}
                })}
            value={limit}
        />
    }
}

const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
            <SwapVertIcon/>
        </components.DropdownIndicator>
    );
};

export default Limit;
