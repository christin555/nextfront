import ProductView from '../../components/pages/product/ProductView'
import {inject, observer} from "mobx-react";
import {Component} from "react";

@inject('RootStore')
@observer
class index extends Component {
    static async getInitialProps({RootStore, query}) {

        RootStore.ProductStore.setAlias(query.id)
        await RootStore.ProductStore.getProduct();
        await RootStore.ProductStore.getHierarchy();

        return {RootStoreUp: RootStore};
    }

    render() {
        const {RootStore, RootStoreUp} = this.props;

        RootStore.mergeStores(RootStoreUp);
        return <ProductView/>
    }
}

export default index;

