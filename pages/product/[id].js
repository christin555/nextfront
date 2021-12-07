import ProductView from '../../components/pages/product/ProductView'

const index = () =>  <ProductView />

index.getInitialProps = async({MobxStore}) => {
    await MobxStore.RootStore.ProductStore.getProduct();
    await MobxStore.RootStore.ProductStore.getHierarchy();

    return {MobxStore};
}

export default index;

