import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import styles from "./inputSearchMenu.module.scss";
import {InputBase} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import cn from "classnames";
import classNames from "classnames";
import CloseIcon from '@mui/icons-material/Close';
import Button from "../Button";

@inject(({RouterStore, RootStore}) => {
    return {
        searchValue: RouterStore.searchValue,
        search: RouterStore.search,
        setValue: RouterStore.setValue,
        setCategoryMerge: RootStore.setCategoryMerge
    };
})
@observer
class InputSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }
    }

    openSearch = () => {
        this.setState({isOpen: true})
    }

    pressHandler = (e) => {
        if (e.key === 'Enter') {
            this.search()
        }
    }

    search = () => {
        const {search, setCategoryMerge, searchValue, onClick} = this.props;
        onClick && onClick();
        if (!searchValue) {
            return
        }
        setCategoryMerge(null, searchValue);
        search();
    }

    closeSearch = () => {
        this.setState({isOpen: false})
    }

    render() {
        const {setValue, searchValue, className} = this.props;
        const {isOpen} = this.state;

        return (
            <div className={cn(styles.search, className)}>
                <SearchIcon
                    className={styles.iconSearch}
                    onClick={!isOpen && this.openSearch || null}
                />
                <div
                    className={classNames({[styles.isHide]: !isOpen}, styles.input)}>
                    <SearchIcon
                        className={styles.iconSearch}
                        onClick={this.search}
                    />
                    <InputBase
                        sx={{ml: 1, flex: 1}}
                        placeholder={'Поиск'}
                        inputProps={{'aria-label': 'поиск'}}
                        onChange={setValue}
                        onKeyPress={this.pressHandler}
                        value={searchValue}
                    />
                    <Button onClick={this.search}> Найти </Button>
                    <CloseIcon onClick={this.closeSearch}/>
                </div>
            </div>
        );
    }
}

export default InputSearch;
