import React, {Component} from 'react';
import 'react-multi-carousel/lib/styles.css';
import {inject, observer} from 'mobx-react';
import styles from "./menu.module.scss";
import {InputBase} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {toJS} from "mobx";

@inject(({RouterStore}) => {
    return {
        searchValue: RouterStore.searchValue,
        search: RouterStore.search,
        setValue: RouterStore.setValue
    };
})
@observer
class InputSearch extends Component {
    render() {
        const {search, setValue, searchValue} = this.props;
        return (
            <div className={styles.search}>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={'Поиск'}
                    inputProps={{ 'aria-label': 'поиск' }}
                    onChange={setValue}
                    //onKeyPress={search}
                    value={searchValue}
                />
                <SearchIcon onClick={search}/>
            </div>
        );
    }
}

export default InputSearch;
