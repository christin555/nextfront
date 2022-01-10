import ProductView from '../../components/pages/product/ProductView'
import {inject, observer} from "mobx-react";
import {Component} from "react";

@inject('RootStore')
@observer
class index extends Component {
    constructor(props) {
        super();
        const {RootStore, RootStoreUp} = props;

        RootStore.mergeStores(RootStoreUp);
    }

    static async getInitialProps({RootStore, req}) {
        await RootStore.ProductStore.getProduct();
        await RootStore.ProductStore.getHierarchy();

        return {RootStoreUp: RootStore};
    }

    render(){
        return <ProductView/>
    }
}

export default index;

