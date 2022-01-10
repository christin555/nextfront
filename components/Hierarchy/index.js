import React from 'react';
import s from './Hierarchy.module.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Router from "next/router";
import NextLink from "next/link";
import HomeIcon from "@mui/icons-material/Home";

@inject(`RouterStore`)
@observer
class Hierarchy extends React.Component {
    routeChange = (alias) => {
        const pathname = `/catalog/${alias}`;

        this.props.RouterStore.push({
                pathname: '/catalog/[category]',
                query: {
                    category: alias
                },
            },
            undefined,
            {shallow: true}
        );
    }

    toCatalog = () => this.props.RouterStore.push({
        pathname: '/catalog',
        query: {}
    });

    render() {
        const {hierarchy, className} = this.props;

        return (
            <div className={classNames(s.level, className)}>
                <NextLink
                    href={{
                        pathname: '/',
                    }}
                    passHref
                    shallow={true}
                >
                    <a style={{display: 'flex'}}><HomeIcon className={s.homeIcon}/></a>
                </NextLink>
                <ArrowForwardIosIcon className={s.icon}/>
                <NextLink
                    href={{
                        pathname: '/catalog',
                    }}
                    passHref
                    shallow={true}
                >
                    <a style={{display: 'flex'}}>Каталог</a>
                </NextLink>
                {
                    hierarchy.map(({name, alias}, index) => (
                        <React.Fragment key={index}>
                            <ArrowForwardIosIcon className={s.icon}/>
                            <span
                                onClick={() => index !== hierarchy.length - 1 && alias && this.routeChange(alias)}
                                className={index === hierarchy.length - 1 ? s.last : null}
                            >
                {name}
              </span>
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
