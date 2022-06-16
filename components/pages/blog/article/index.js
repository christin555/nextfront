import React from 'react';
import {inject, observer} from 'mobx-react';
import {status as statusEnum} from '../../../../src/enums';
import Loader from "../../../Loader";
import ArticleView from "./ArticleView";
import PageNotFound from "../../../InformBlocks/PageNotFound";

@inject(({RootStore: {ArticlesStore}}) => {
    return {
        status: ArticlesStore.statusArticle
    };
}) @observer
class Article extends React.Component {
    render() {
        const {status} = this.props;

        if (status === statusEnum.LOADING) {
            return <Loader/>
        }
        if (status === statusEnum.SUCCESS) {
            return <ArticleView/>
        }
        if (status === statusEnum.ERROR) {
            return <PageNotFound />
        }
        return null;
    }
}

export default Article;
