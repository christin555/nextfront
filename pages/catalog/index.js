import CatalogView from '../../components/pages/catalog/CatalogView'
import {inject, observer} from "mobx-react";
import {Component} from "react";

@inject('RootStore')
@observer
class index extends Component {
    static async getInitialProps({MobxStore, query, pathname, asPath}) {
        console.log(query, pathname, asPath)

        MobxStore.RootStore.setCategory(query?.category);

        await MobxStore.RootStore.CatalogStore.getHierarchy();
        await MobxStore.RootStore.CatalogStore.getCatalog()

        return {RootStoreUp: MobxStore.RootStore};
    }

    render() {
        const {RootStore, RootStoreUp} = this.props;

        RootStore.mergeStores(RootStoreUp);

        return <CatalogView/>
    }

}

export default index;

