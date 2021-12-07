import CatalogView from '../../components/pages/catalog/CatalogView'

const index = () => <CatalogView />

index.getInitialProps = async({MobxStore}) => {
    await MobxStore.RootStore.CatalogStore.getHierarchy();
    await  MobxStore.RootStore.CatalogStore.getCatalog()
    await  MobxStore.RootStore.CatalogStore.getCountProducts()

    return {MobxStore};
}

export default index;

