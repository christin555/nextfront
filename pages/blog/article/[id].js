import ArticleView from '../../../components/pages/blog/article'
import {inject, observer} from "mobx-react";
import {Component} from "react";

@inject('RootStore')
@observer
class index extends Component {
    static async getInitialProps({MobxStore, query}) {
        MobxStore.RootStore.ArticlesStore.setAlias(query?.id);

        await MobxStore.RootStore.ArticlesStore.getArticle();
        await MobxStore.RootStore.ArticlesStore.getArticles();

        return {MobxStore, RootStoreUp: MobxStore.RootStore};
    }

    render(){
        const {RootStore, RootStoreUp} = this.props;

        RootStore.mergeStores(RootStoreUp);

        return <ArticleView/>
    }
}


export default index;
