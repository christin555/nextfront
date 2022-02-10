import React, {Component} from 'react';
import 'react-multi-carousel/lib/styles.css';
import {inject, observer} from 'mobx-react';
import styles from "./inputSearchMenu.module.scss";
import {InputBase} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import cn from "classnames";
import classNames from "classnames";
import CloseIcon from '@mui/icons-material/Close';

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

    search = () => {
        const {search, setCategoryMerge, searchValue, onClick} = this.props;
        onClick && onClick();
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
                        //onKeyPress={this.search}
                        value={searchValue}
                    />
                    <CloseIcon onClick={this.closeSearch}/>
                </div>
            </div>
        );
    }
}

export default InputSearch;
