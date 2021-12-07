import ArticlesView from "../../components/pages/blog/ArticlesView";

const index = () => <ArticlesView />

index.getInitialProps = async({MobxStore}) => {
  await MobxStore.RootStore.ArticlesStore.getArticles();

  return {MobxStore};
}

export default index;

