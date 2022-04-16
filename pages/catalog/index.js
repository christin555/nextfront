import CatalogView from '../../components/pages/catalog'
import {inject, observer} from "mobx-react";
import {Component} from "react";
import api from "../../src/api";

@inject('RootStore')
@observer
class index extends Component {
    static async getInitialProps({MobxStore, query,deviceType, pathname, asPath}) {
        MobxStore.RootStore.setCategory(query?.category);

        const [headers] = await Promise.all([
             api.post('/seo/getHeaders', {query, pathname, asPath}),
             MobxStore.RootStore.CatalogStore.getHierarchy(),
        ])

        return {headers, deviceType};
    }

    render() {
        const {RootStore, RootStoreUp, headers, deviceType} = this.props;

        //RootStore.mergeStores(RootStoreUp);

        return <CatalogView headers={headers}/>
    }

}

export default index;

