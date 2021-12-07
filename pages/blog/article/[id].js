import ArticleView from '../../../components/pages/blog/article/ArticleView'

const index = () =>  <ArticleView />

index.getInitialProps = async({MobxStore}) => {
    await MobxStore.RootStore.ArticlesStore.getArticle();
    await MobxStore.RootStore.ArticlesStore.getArticles();

    return {MobxStore};
}

export default index;
