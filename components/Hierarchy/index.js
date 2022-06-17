import React from 'react';
import s from './Hierarchy.module.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Router from "next/router";
import NextLink from "next/link";
import HomeIcon from "@mui/icons-material/Home";

@inject(`RootStore`)
@observer
class Hierarchy extends React.Component {
    routeChange = (alias) => this.props.RootStore.setCategoryMerge(alias)

    render() {
        const {hierarchy, className} = this.props;

        return (
            <div className={classNames(s.level, className)}>
                <NextLink
                    href={{
                        pathname: '/',
                    }}
                    passHref
                >
                    <a style={{display: 'flex', cursor: 'pointer'}}>Главная</a>
                </NextLink>
                <ArrowForwardIosIcon className={s.icon}/>
                <NextLink
                    href={{
                        pathname: '/catalog',
                    }}
                    passHref
                    shallow={true}
                >
                    <a style={{display: 'flex'}} onClick={() => this.routeChange(null)}>Каталог</a>
                </NextLink>
                {
                    hierarchy.map(({name, alias}, index) => (
                        <React.Fragment key={index}>
                            <ArrowForwardIosIcon className={s.icon}/>
                            <NextLink
                                href={`/catalog/[category]`}
                                as={`/catalog/${alias}`}
                                passHref
                                shallow={true}>
                                <a
                                    onClick={() => alias && this.routeChange(alias)}
                                >
                                    {name}
                                </a>
                            </NextLink>
                        </React.Fragment>
                    ))
                }
            </div>
        );
    }
}

Hierarchy.propTypes = {
    hierarchy: PropTypes.arrayOf(PropTypes.object),
    history: PropTypes.object
};

Hierarchy.defaultProps = {
    hierarchy: []
};

export default Hierarchy;
