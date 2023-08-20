import React, {Component} from 'react';
import s from './Blocks.module.scss';
import TitleBlock from '../../../TitleBlock';
import Button from '../../../Button';
import NextLink from "next/link";
import {Typography} from "@mui/material";
import Cards from "../../../NewsCards/Cards";
import {inject, observer} from "mobx-react";
import Link from "next/link";
import Box from "@mui/material/Box";


@inject(({RootStore: {HomeStore}}) => {
    return {
        articles: HomeStore.articles || []
    };
})
@observer
class Blog extends Component {

    render() {
        const {articles} = this.props;

        return (
            <div className={s.blog}>
                <div className={s.mainBlog}>
                    <div className={s.desc}>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <TitleBlock title={'Помогаем выбрать лучшее'}/>
                            <Link href={{
                                pathname: '/blog',
                            }}
                                  as={`/blog`}
                                  passHref
                                  shallow={true}>

                                <a> Все посты </a>
                            </Link>
                        </Box>
                        <p>
                            Наши специалисты имеют многолетний опыт в укладке напольных покрытий и всегда рады
                            поделиться своими знаниями!
                        </p>
                    </div>
                </div>
                <div className={s.popularBlock}>
                    <Typography variant={'subtitle2'}> Полезно для выбора </Typography>
                    <div className={s.popularNews}>
                        <Cards articles={articles}/>
                    </div>
                </div>
            </div>
        )
    }
};

export default Blog;
