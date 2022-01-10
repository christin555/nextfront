import CatalogView from '../../components/pages/catalog/CatalogView'
import {inject, observer} from "mobx-react";
import {Component} from "react";
@inject('RootStore')
@observer
class index extends Component {
    static async getInitialProps({MobxStore, query}) {
        MobxStore.RootStore.setCategory(query?.category);

        await MobxStore.RootStore.CatalogStore.getHierarchy();
        await  MobxStore.RootStore.CatalogStore.getCatalog()

        return {MobxStore, RootStoreUp: MobxStore.RootStore};
    }

    render(){
        const {RootStore, RootStoreUp} = this.props;

        RootStore.mergeStores(RootStoreUp);

        return <CatalogView/>
    }

}

export default index;

