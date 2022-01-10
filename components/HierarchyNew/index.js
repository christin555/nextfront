import React from 'react';
import s from './Hierarchy.module.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Router from "next/router";
import NextLink from "next/link";
import HomeIcon from '@mui/icons-material/Home';

@inject(`RouterStore`)
@observer
class Hierarchy extends React.Component {
    render() {
        const {hierarchy, className} = this.props;

        const elements = hierarchy.map(({name, pathname}, index) => {
                const elem = index === hierarchy.length - 1 ?
                    <span className={s.last}>
                        {name}
                    </span> : <NextLink href={{pathname}}
                                        passHref
                    >
                        <a className={index === hierarchy.length - 1 ? s.last : null}>
                            {name}
                        </a>
                    </NextLink>


                return <React.Fragment key={index}>
                    <ArrowForwardIosIcon className={s.icon}/>
                    {elem}
                </React.Fragment>
            }
        )


        return (
            <div className={classNames(s.levels, className)}>
                <NextLink
                    href={{
                        pathname: '/',
                    }}
                    passHref
                >
                    <a style={{display: 'flex'}}><HomeIcon className={s.homeIcon}/></a>
                </NextLink>
                {elements}
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
