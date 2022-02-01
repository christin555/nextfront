import React, {Component} from 'react';
import 'react-multi-carousel/lib/styles.css';
import {inject, observer} from 'mobx-react';
import styles from "./inputSearch.module.scss";
import {InputBase} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import cn from "classnames";

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
    search = () => {
        const {search, setCategoryMerge, searchValue, onClick} = this.props;
        onClick && onClick();
        setCategoryMerge(null, searchValue);
        search();
    }

    render() {
        const {setValue, searchValue, className} = this.props;
        return (
            <div className={cn(styles.search, className)}>
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder={'Поиск'}
                    inputProps={{'aria-label': 'поиск'}}
                    onChange={setValue}
                    //onKeyPress={this.search}
                    value={searchValue}
                />
                <SearchIcon className={styles.iconSearch} onClick={this.search}/>
            </div>
        );
    }
}

export default InputSearch;
